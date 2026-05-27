import { requireAuth } from '@/lib/auth/simple-auth'
import { supabaseAdmin } from '@/lib/supabase/admin-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')?.trim() ?? ''
  const vertical = searchParams.get('vertical')?.trim() ?? ''
  const page = parseInt(searchParams.get('page') ?? '1')
  const pageSize = Math.min(parseInt(searchParams.get('pageSize') ?? '50'), 200)
  const offset = (page - 1) * pageSize

  let query = supabaseAdmin
    .from('refyne_company_cache')
    .select(
      'domain, company_name, industry_hubspot, employee_count, revenue, phone, updated_at',
      { count: 'exact' }
    )
    .order('updated_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (search) {
    // Search across domain and company_name
    query = query.or(`domain.ilike.%${search}%,company_name.ilike.%${search}%`)
  }

  if (vertical && vertical !== 'all') {
    query = query.eq('industry_hubspot', vertical)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Database query error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (data ?? []).map((r) => ({
    domain: r.domain,
    companyName: r.company_name,
    vertical: r.industry_hubspot ?? 'Unknown',
    employees: r.employee_count,
    revenue: r.revenue,
    phone: r.phone,
    cachedAt: r.updated_at,
  }))

  return NextResponse.json({
    rows,
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  })
}
