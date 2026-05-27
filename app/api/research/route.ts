import { requireAuth } from '@/lib/auth/simple-auth'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')?.trim().toLowerCase()

  if (!domain) {
    return NextResponse.json({ error: 'domain param required' }, { status: 400 })
  }

  // Normalize domain: strip protocol and trailing slash
  const normalizedDomain = domain
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .toLowerCase()

  const [cacheResult, usageResult] = await Promise.all([
    supabaseAdmin
      .from('refyne_company_cache')
      .select('*')
      .eq('domain', normalizedDomain)
      .single(),

    supabaseAdmin
      .from('refyne_search_usage')
      .select('field_key, cache_hit, confidence, cost_usd, serper_calls, deepseek_input_tokens, deepseek_output_tokens, created_at')
      .eq('domain', normalizedDomain)
      .order('created_at', { ascending: false })
      .limit(50),
  ])

  if (cacheResult.error?.code === 'PGRST116') {
    // No rows found
    return NextResponse.json({ found: false, domain: normalizedDomain })
  }

  if (cacheResult.error) {
    return NextResponse.json({ error: cacheResult.error.message }, { status: 500 })
  }

  const record = cacheResult.data

  // Build a structured field breakdown for the debug view
  const fields = [
    {
      key: 'company_name',
      label: 'Company Name',
      value: record.company_name,
      confidence: null,
      source: null,
      extractedAt: null,
      expiresAt: null,
    },
    {
      key: 'industry_hubspot',
      label: 'Industry',
      value: record.industry_hubspot,
      confidence: record.industry_confidence,
      source: record.industry_source,
      evidence: record.industry_evidence,
      extractedAt: record.industry_extracted_at,
      expiresAt: record.industry_expires_at,
    },
    {
      key: 'employee_count',
      label: 'Employee Count',
      value: record.employee_count,
      confidence: record.employee_count_confidence,
      source: record.employee_count_source,
      evidence: record.employee_count_evidence,
      extractedAt: record.employee_count_extracted_at,
      expiresAt: record.employee_count_expires_at,
    },
    {
      key: 'revenue',
      label: 'Revenue',
      value: record.revenue,
      confidence: record.revenue_confidence,
      source: record.revenue_source,
      evidence: record.revenue_evidence,
      extractedAt: record.revenue_extracted_at,
      expiresAt: record.revenue_expires_at,
    },
    {
      key: 'phone',
      label: 'Phone',
      value: record.phone,
      confidence: record.phone_confidence,
      source: record.phone_source,
      evidence: null,
      extractedAt: record.phone_extracted_at,
      expiresAt: record.phone_expires_at,
    },
    {
      key: 'linkedin_url',
      label: 'LinkedIn URL',
      value: record.linkedin_url,
      confidence: record.linkedin_url_confidence,
      source: record.linkedin_url_source,
      evidence: null,
      extractedAt: record.linkedin_url_extracted_at,
      expiresAt: record.linkedin_url_expires_at,
    },
  ]

  const usageRows = usageResult.data ?? []
  const totalCost = usageRows.reduce((sum, r) => sum + (Number(r.cost_usd) || 0), 0)
  const cacheHitCount = usageRows.filter((r) => r.cache_hit).length

  return NextResponse.json({
    found: true,
    domain: normalizedDomain,
    record: {
      companyName: record.company_name,
      companyNameNormalized: record.company_name_normalized,
      enrichmentVersion: record.enrichment_version,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      orgId: record.org_id,
    },
    fields,
    usage: {
      totalLookups: usageRows.length,
      cacheHits: cacheHitCount,
      liveLookups: usageRows.length - cacheHitCount,
      totalCostUsd: Math.round(totalCost * 10000) / 10000,
      recentLookups: usageRows.slice(0, 10),
    },
  })
}
