-- Run this in the Supabase SQL editor.
-- Creates an RPC function that does the GROUP BY on the database side.
-- This replaces the JS-side aggregation in /api/verticals once the
-- refyne_company_cache table grows past ~10K rows.

CREATE OR REPLACE FUNCTION get_vertical_counts()
RETURNS TABLE (
  vertical TEXT,
  count    BIGINT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    COALESCE(industry_hubspot, 'Unknown') AS vertical,
    COUNT(*)                              AS count
  FROM public.refyne_company_cache
  GROUP BY COALESCE(industry_hubspot, 'Unknown')
  ORDER BY count DESC;
$$;

-- Grant execute to the service role (used by the admin client)
GRANT EXECUTE ON FUNCTION get_vertical_counts() TO service_role;

-- To use this in the /api/verticals route, replace the JS aggregation with:
--
-- const { data } = await supabaseAdmin.rpc('get_vertical_counts')
--
-- The current JS aggregation is fine while the table is empty or small.
-- Switch to the RPC once you have 10K+ rows.
