import { requireAuth } from '@/lib/auth/simple-auth'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request)
  if (authError) return authError

  // Get total count and per-vertical counts in parallel
  const [totalResult, verticalResult] = await Promise.all([
    supabaseAdmin
      .from('refyne_company_cache')
      .select('*', { count: 'exact', head: true }),

    // Supabase doesn't support GROUP BY directly in the client,
    // so we use an RPC or a raw query via the REST API.
    // Using select with a workaround: fetch just industry_hubspot column
    // and aggregate in JS. For large tables, use an RPC instead.
    supabaseAdmin
      .from('refyne_company_cache')
      .select('industry_hubspot'),
  ])

  if (totalResult.error) {
    return NextResponse.json({ error: totalResult.error.message }, { status: 500 })
  }
  if (verticalResult.error) {
    return NextResponse.json({ error: verticalResult.error.message }, { status: 500 })
  }

  const total = totalResult.count ?? 0
  const rows = verticalResult.data ?? []

  // Aggregate in JS
  const counts: Record<string, number> = {}
  for (const row of rows) {
    const key = row.industry_hubspot ?? 'Unknown'
    counts[key] = (counts[key] ?? 0) + 1
  }

  const verticals = Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)

  // Identify best and worst coverage
  const nonUnknown = verticals.filter((v) => v.name !== 'Unknown')
  const best = nonUnknown[0] ?? null
  const worst = nonUnknown[nonUnknown.length - 1] ?? null

  return NextResponse.json({
    total,
    verticals,
    best: best ? { name: best.name, percentage: best.percentage } : null,
    worst: worst ? { name: worst.name, percentage: worst.percentage } : null,
  })
}
