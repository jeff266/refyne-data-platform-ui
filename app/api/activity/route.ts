import { requireAuth } from '@/lib/auth/simple-auth'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { NextRequest, NextResponse } from 'next/server'

// Fields we count as "filled" for the fields count column
const TRACKED_FIELDS = [
  'company_name',
  'industry_hubspot',
  'employee_count',
  'revenue',
  'linkedin_url',
  'phone',
]

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100)

  const { data, error } = await supabaseAdmin
    .from('refyne_company_cache')
    .select(
      'domain, company_name, industry_hubspot, industry_source, employee_count, revenue, linkedin_url, phone, created_at, updated_at'
    )
    .order('updated_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Activity query error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Cross-reference with usage table to determine if this was a cache hit or live enrichment
  const domains = (data ?? []).map((r) => r.domain)

  const { data: usageData } = await supabaseAdmin
    .from('refyne_search_usage')
    .select('domain, cache_hit, created_at')
    .in('domain', domains)
    .order('created_at', { ascending: false })

  // Build a domain -> most recent status map
  const domainStatus: Record<string, string> = {}
  for (const row of usageData ?? []) {
    if (!domainStatus[row.domain]) {
      domainStatus[row.domain] = row.cache_hit ? 'cache_hit' : 'enriched'
    }
  }

  const rows = (data ?? []).map((r) => {
    const filledCount = TRACKED_FIELDS.filter(
      (f) => r[f as keyof typeof r] !== null && r[f as keyof typeof r] !== undefined
    ).length

    return {
      domain: r.domain,
      companyName: r.company_name,
      vertical: r.industry_hubspot ?? 'Unknown',
      status: domainStatus[r.domain] ?? 'enriched',
      fieldsFilled: filledCount,
      updatedAt: r.updated_at,
    }
  })

  return NextResponse.json({ rows })
}
