"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

interface CompanyRow {
  domain: string;
  companyName: string | null;
  vertical: string;
  employees: number | null;
  revenue: number | null;
  phone: string | null;
  cachedAt: string;
}

interface ApiResponse {
  rows: CompanyRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function formatRevenue(cents: number | null) {
  if (!cents) return null;
  if (cents >= 1_000_000_000) return `$${(cents / 1_000_000_000).toFixed(1)}B`;
  if (cents >= 1_000_000) return `$${(cents / 1_000_000).toFixed(1)}M`;
  if (cents >= 1_000) return `$${(cents / 1_000).toFixed(0)}K`;
  return `$${cents}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const VERTICALS = [
  "ABA Therapy",
  "Healthcare",
  "Education",
  "SaaS",
  "Finance",
  "Other",
];

export default function DatabasePage() {
  const [search, setSearch] = useState("");
  const [vertical, setVertical] = useState("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search input
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, vertical]);

  const fetchData = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "50",
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(vertical !== "all" && { vertical }),
    });

    fetch(`/api/database?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, vertical]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const thStyle = {
    padding: "8px 10px",
    textAlign: "left" as const,
    fontSize: 10,
    fontWeight: 600,
    color: C.text3,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 8 }}
        >
          Database
        </h1>
        <p style={{ fontSize: 13, color: C.text2 }}>Browse cached companies</p>
      </div>

      {error && (
        <div
          style={{
            padding: "10px 14px",
            background: C.redDim,
            border: `1px solid ${C.redBrd}`,
            borderRadius: 8,
            color: C.red,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          Error: {error}
        </div>
      )}

      {/* Filter Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <div style={{ position: "relative", flex: 1, maxWidth: 260 }}>
          <Search
            style={{
              position: "absolute",
              left: 9,
              top: "50%",
              transform: "translateY(-50%)",
              width: 14,
              height: 14,
              color: C.text3,
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search domain or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "7px 10px 7px 30px",
              background: C.surface,
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 6,
              color: C.text,
              fontSize: 12,
              fontFamily: F.sans,
              outline: "none",
            }}
          />
        </div>

        <select
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          style={{
            padding: "7px 10px",
            background: C.surface,
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 6,
            color: C.text2,
            fontSize: 12,
            fontFamily: F.sans,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">All Verticals</option>
          {VERTICALS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <div style={{ marginLeft: "auto", fontSize: 11, color: C.text3 }}>
          {loading
            ? "Loading..."
            : data
            ? `${data.total.toLocaleString()} records`
            : ""}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: 0,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              <th style={thStyle}>Domain</th>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Vertical</th>
              <th style={thStyle}>Employees</th>
              <th style={thStyle}>Revenue</th>
              <th style={thStyle}>Phone</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Cached</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "40px 0",
                    textAlign: "center",
                    color: C.text3,
                    fontSize: 12,
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : !data || data.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "40px 0",
                    textAlign: "center",
                    color: C.text3,
                    fontSize: 12,
                  }}
                >
                  {debouncedSearch || vertical !== "all"
                    ? "No results match your filters"
                    : "No companies in cache yet"}
                </td>
              </tr>
            ) : (
              data.rows.map((company, idx) => (
                <tr
                  key={company.domain}
                  style={{
                    borderBottom:
                      idx === data.rows.length - 1
                        ? "none"
                        : `1px solid rgba(255,255,255,0.04)`,
                  }}
                >
                  <td
                    style={{
                      padding: "9px 10px",
                      color: C.text2,
                      fontFamily: F.mono,
                      fontSize: 11,
                    }}
                  >
                    {company.domain}
                  </td>
                  <td style={{ padding: "9px 10px", color: C.text }}>
                    {company.companyName ?? (
                      <span style={{ color: C.text3 }}>Unknown</span>
                    )}
                  </td>
                  <td style={{ padding: "9px 10px", color: C.text2 }}>
                    {company.vertical}
                  </td>
                  <td style={{ padding: "9px 10px", color: C.text2 }}>
                    {company.employees?.toLocaleString() ?? (
                      <span style={{ color: C.text3 }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "9px 10px", color: C.text2 }}>
                    {formatRevenue(company.revenue) ?? (
                      <span style={{ color: C.text3 }}>—</span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      color: C.text2,
                      fontFamily: F.mono,
                      fontSize: 11,
                    }}
                  >
                    {company.phone ?? <span style={{ color: C.text3 }}>—</span>}
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      color: C.text2,
                      fontFamily: F.mono,
                      fontSize: 11,
                      textAlign: "right",
                    }}
                  >
                    {formatDate(company.cachedAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 11, color: C.text3 }}>
            Page {data.page} of {data.totalPages.toLocaleString()}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "5px 12px",
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: 5,
                color: page === 1 ? C.text3 : C.text2,
                fontSize: 12,
                fontWeight: 500,
                cursor: page === 1 ? "not-allowed" : "pointer",
                fontFamily: F.sans,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              style={{
                padding: "5px 12px",
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: 5,
                color: page === data.totalPages ? C.text3 : C.text2,
                fontSize: 12,
                fontWeight: 500,
                cursor: page === data.totalPages ? "not-allowed" : "pointer",
                fontFamily: F.sans,
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
