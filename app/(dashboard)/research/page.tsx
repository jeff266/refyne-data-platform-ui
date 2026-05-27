"use client";

import { useState } from "react";
import { Search, Building, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

interface FieldResult {
  key: string;
  label: string;
  value: string | number | null;
  confidence: number | null;
  source: string | null;
  evidence: string | null;
  extractedAt: string | null;
  expiresAt: string | null;
}

interface UsageData {
  totalLookups: number;
  cacheHits: number;
  liveLookups: number;
  totalCostUsd: number;
}

interface ResearchResult {
  found: boolean;
  domain: string;
  record?: {
    companyName: string | null;
    companyNameNormalized: string | null;
    enrichmentVersion: string | null;
    createdAt: string;
    updatedAt: string;
  };
  fields?: FieldResult[];
  usage?: UsageData;
}

function ConfidenceBadge({ confidence }: { confidence: number | null }) {
  if (confidence === null) return <span style={{ color: C.text3 }}>—</span>;
  const pct = Math.round(confidence * 100);
  const color = pct >= 80 ? C.green : pct >= 60 ? C.amber : C.red;
  const bg = pct >= 80 ? C.greenDim : pct >= 60 ? C.amberDim : C.redDim;
  const border = pct >= 80 ? C.greenBrd : pct >= 60 ? C.amberBrd : C.redBrd;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "2px 6px",
        background: bg,
        color,
        border: `1px solid ${border}`,
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 600,
      }}
    >
      {pct}%
    </span>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatValue(value: string | number | null) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    return value.toLocaleString();
  }
  return String(value);
}

export default function ResearchPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleLookup() {
    const trimmed = domain.trim().toLowerCase();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);
    setError(null);

    fetch(`/api/research?domain=${encodeURIComponent(trimmed)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setResult(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleLookup();
  }

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
          Research
        </h1>
        <p style={{ fontSize: 13, color: C.text2 }}>
          Single company lookup and enrichment debug
        </p>
      </div>

      {/* Lookup Card */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
            marginBottom: 14,
          }}
        >
          Company Lookup
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 0 }}>
          <input
            type="text"
            placeholder="e.g. fronteracare.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "9px 12px",
              background: C.bg,
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 7,
              color: C.text,
              fontSize: 12,
              fontFamily: F.mono,
              outline: "none",
              maxWidth: 480,
            }}
          />
          <button
            onClick={handleLookup}
            disabled={loading || !domain.trim()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background:
                loading || !domain.trim()
                  ? C.surface
                  : `linear-gradient(to bottom, ${C.indigo}, ${C.indigoDk})`,
              color: loading || !domain.trim() ? C.text3 : "#fff",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: F.sans,
              border: `1px solid ${loading || !domain.trim() ? C.border : C.indigoBrd}`,
              cursor: loading || !domain.trim() ? "not-allowed" : "pointer",
              boxShadow:
                loading || !domain.trim()
                  ? "none"
                  : `0 0 0 1px ${C.indigoBrd}`,
            }}
          >
            <Search style={{ fontSize: 13, width: 13, height: 13 }} />
            {loading ? "Looking up..." : "Lookup"}
          </button>
        </div>
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

      {/* Empty state */}
      {!loading && !result && !error && (
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "48px 0",
            textAlign: "center",
          }}
        >
          <Building
            style={{
              width: 32,
              height: 32,
              color: "#27272A",
              margin: "0 auto 12px",
            }}
          />
          <div style={{ fontSize: 13, color: C.text3 }}>
            Enter a domain to debug enrichment results
          </div>
        </div>
      )}

      {/* Not found state */}
      {result && !result.found && (
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "32px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <XCircle style={{ width: 20, height: 20, color: C.red, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>
              Not in cache
            </div>
            <div style={{ fontSize: 12, color: C.text2 }}>
              <span style={{ fontFamily: F.mono }}>{result.domain}</span> has not
              been enriched yet. When a HubSpot user looks up this company, Refyne
              will enrich it and store the result here.
            </div>
          </div>
        </div>
      )}

      {/* Found state */}
      {result && result.found && result.record && (
        <>
          {/* Record header */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 16,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                {result.record.companyName ?? result.domain}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.text3,
                  fontFamily: F.mono,
                }}
              >
                {result.domain}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 8px",
                  background: C.greenDim,
                  color: C.green,
                  border: `1px solid ${C.greenBrd}`,
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                <CheckCircle style={{ width: 11, height: 11 }} />
                In cache
              </div>
              <div style={{ fontSize: 11, color: C.text3 }}>
                Updated {formatDate(result.record.updatedAt)}
              </div>
            </div>
          </div>

          {/* Usage summary */}
          {result.usage && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
                marginBottom: 12,
              }}
            >
              {[
                { label: "Total Lookups", value: result.usage.totalLookups },
                { label: "Cache Hits", value: result.usage.cacheHits },
                { label: "Live Lookups", value: result.usage.liveLookups },
                {
                  label: "Total Cost",
                  value: `$${result.usage.totalCostUsd.toFixed(4)}`,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: C.text3,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 6,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: C.text,
                      fontFamily: F.mono,
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Field breakdown */}
          {result.fields && result.fields.length > 0 && (
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                Field Provenance
              </div>
              <table
                style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
              >
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={thStyle}>Field</th>
                    <th style={thStyle}>Value</th>
                    <th style={thStyle}>Confidence</th>
                    <th style={thStyle}>Source</th>
                    <th style={thStyle}>Extracted</th>
                    <th style={thStyle}>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {result.fields.map((field, idx) => {
                    const val = formatValue(field.value);
                    return (
                      <tr
                        key={field.key}
                        style={{
                          borderBottom:
                            idx === (result.fields?.length ?? 0) - 1
                              ? "none"
                              : `1px solid rgba(255,255,255,0.04)`,
                          background: val ? "transparent" : "rgba(255,255,255,0.01)",
                        }}
                      >
                        <td
                          style={{
                            padding: "9px 10px",
                            color: C.text2,
                            fontWeight: 500,
                          }}
                        >
                          {field.label}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            color: val ? C.text : C.text3,
                            fontFamily: val ? F.mono : F.sans,
                            fontSize: val ? 11 : 12,
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {val ?? "—"}
                        </td>
                        <td style={{ padding: "9px 10px" }}>
                          <ConfidenceBadge confidence={field.confidence} />
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            color: C.text3,
                            fontSize: 11,
                          }}
                        >
                          {field.source ?? "—"}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            color: C.text3,
                            fontFamily: F.mono,
                            fontSize: 11,
                          }}
                        >
                          {formatDate(field.extractedAt)}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            color: C.text3,
                            fontFamily: F.mono,
                            fontSize: 11,
                          }}
                        >
                          {formatDate(field.expiresAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Evidence row if present */}
              {result.fields.some((f) => f.evidence) && (
                <div
                  style={{
                    borderTop: `1px solid ${C.border}`,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: C.text3,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 8,
                    }}
                  >
                    Evidence
                  </div>
                  {result.fields
                    .filter((f) => f.evidence)
                    .map((f) => (
                      <div
                        key={f.key}
                        style={{
                          fontSize: 11,
                          color: C.text2,
                          marginBottom: 6,
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            color: C.text3,
                            fontWeight: 500,
                            marginRight: 6,
                          }}
                        >
                          {f.label}:
                        </span>
                        {f.evidence}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
