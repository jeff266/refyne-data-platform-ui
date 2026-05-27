import { requireAuth } from '@/lib/auth/simple-auth'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request)
  if (authError) return authError

  const [cacheResult, usageResult] = await Promise.all([
    // Total companies in cache
    supabaseAdmin
      .from('refyne_company_cache')
      .select('*', { count: 'exact', head: true }),

    // All usage rows for hit rate + cost calculations
    supabaseAdmin
      .from('refyne_search_usage')
      .select('cache_hit, cost_usd, serper_calls, deepseek_input_tokens, deepseek_output_tokens'),
  ])

  if (cacheResult.error) {
    console.error('Cache count error:', cacheResult.error)
    return NextResponse.json({ error: cacheResult.error.message }, { status: 500 })
  }

  if (usageResult.error) {
    console.error('Usage query error:', usageResult.error)
    return NextResponse.json({ error: usageResult.error.message }, { status: 500 })
  }

  const totalCompanies = cacheResult.count ?? 0
  const usageRows = usageResult.data ?? []

  const totalLookups = usageRows.length
  const cacheHits = usageRows.filter((r) => r.cache_hit).length
  const hitRate = totalLookups > 0 ? Math.round((cacheHits / totalLookups) * 100) : 0

  // Cost saved: cache hits avoided a live enrichment call.
  // We estimate the saved cost as the average cost of a non-cached call
  // multiplied by the number of cache hits.
  const liveCalls = usageRows.filter((r) => !r.cache_hit)
  const totalLiveCost = liveCalls.reduce((sum, r) => sum + (Number(r.cost_usd) || 0), 0)
  const avgLiveCallCost = liveCalls.length > 0 ? totalLiveCost / liveCalls.length : 0
  const costSavedUsd = cacheHits * avgLiveCallCost

  // Actual spend on live enrichment
  const totalSpendUsd = totalLiveCost

  // Total Serper calls and token usage for context
  const totalSerperCalls = usageRows.reduce((sum, r) => sum + (r.serper_calls || 0), 0)
  const totalInputTokens = usageRows.reduce((sum, r) => sum + (r.deepseek_input_tokens || 0), 0)
  const totalOutputTokens = usageRows.reduce((sum, r) => sum + (r.deepseek_output_tokens || 0), 0)

  return NextResponse.json({
    totalCompanies,
    totalLookups,
    cacheHits,
    hitRate,
    costSavedUsd: Math.round(costSavedUsd * 100) / 100,
    totalSpendUsd: Math.round(totalSpendUsd * 100) / 100,
    totalSerperCalls,
    totalInputTokens,
    totalOutputTokens,
  })
}
