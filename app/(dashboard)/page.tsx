"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

interface StatsData {
  totalCompanies: number;
  totalLookups: number;
  cacheHits: number;
  hitRate: number;
  costSavedUsd: number;
  totalSpendUsd: number;
  totalSerperCalls: number;
}

interface ActivityRow {
  domain: string;
  companyName: string | null;
  vertical: string;
  status: string;
  fieldsFilled: number;
  updatedAt: string;
}

function StatCard({
  label,
  value,
  delta,
  trend,
  loading,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "neutral";
  loading: boolean;
}) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: C.text3,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: loading ? C.text3 : C.text,
          letterSpacing: "-0.5px",
          marginBottom: 4,
          fontFamily: F.mono,
          transition: "color 0.2s",
        }}
      >
        {loading ? "..." : value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: trend === "up" ? C.green : C.text2,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        {trend === "up" && <ArrowUpRight style={{ width: 12, height: 12 }} />}
        {delta}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isEnriched = status === "enriched";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 600,
        background: isEnriched ? C.greenDim : C.indigoDim,
        color: isEnriched ? C.green : C.indigoLt,
        border: `1px solid ${isEnriched ? C.greenBrd : C.indigoBrd}`,
      }}
    >
      {status}
    </span>
  );
}

export default function OverviewPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [activity, setActivity] = useState<ActivityRow[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setStats(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setStatsLoading(false));

    fetch("/api/activity?limit=20")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setActivity(data.rows ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setActivityLoading(false));
  }, []);

  function formatCost(usd: number) {
    if (usd >= 1000) return `$${Math.round(usd / 1000)}K`;
    return `$${usd.toFixed(0)}`;
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const statCards = [
    {
      label: "Total Companies",
      value: stats ? stats.totalCompanies.toLocaleString() : "0",
      delta: stats
        ? `${stats.totalLookups.toLocaleString()} total lookups`
        : "loading...",
      trend: "up" as const,
    },
    {
      label: "Hit Rate",
      value: stats ? `${stats.hitRate}%` : "0%",
      delta: stats
        ? `${stats.cacheHits.toLocaleString()} cache hits`
        : "loading...",
      trend: "up" as const,
    },
    {
      label: "Cost Saved",
      value: stats ? formatCost(stats.costSavedUsd) : "$0",
      delta: "vs live enrichment cost",
      trend: "neutral" as const,
    },
    {
      label: "Total Spend",
      value: stats ? formatCost(stats.totalSpendUsd) : "$0",
      delta: `${stats?.totalSerperCalls?.toLocaleString() ?? 0} Serper calls`,
      trend: "neutral" as const,
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: C.text,
            marginBottom: 8,
          }}
        >
          Overview
        </h1>
        <p style={{ fontSize: 13, color: C.text2 }}>
          Refyne Search platform metrics and activity
        </p>
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
          Error loading data: {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} loading={statsLoading} />
        ))}
      </div>

      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
            Recent Activity
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 7px",
              background: C.indigoDim,
              color: C.indigoLt,
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 600,
              border: `1px solid ${C.indigoBrd}`,
            }}
          >
            Live
          </span>
        </div>

        {activityLoading ? (
          <div
            style={{ padding: "32px 0", textAlign: "center", color: C.text3, fontSize: 12 }}
          >
            Loading activity...
          </div>
        ) : activity.length === 0 ? (
          <div
            style={{ padding: "32px 0", textAlign: "center", color: C.text3, fontSize: 12 }}
          >
            No activity yet. Enrichment calls will appear here.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Domain", "Company", "Vertical", "Status", "Fields", "Updated"].map(
                  (h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 10px",
                        textAlign: i === 4 || i === 5 ? "right" : "left",
                        fontSize: 10,
                        fontWeight: 600,
                        color: C.text3,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {activity.map((item, idx) => (
                <tr
                  key={`${item.domain}-${idx}`}
                  style={{
                    borderBottom:
                      idx === activity.length - 1
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
                    {item.domain}
                  </td>
                  <td style={{ padding: "9px 10px", color: C.text, fontSize: 12 }}>
                    {item.companyName ?? (
                      <span style={{ color: C.text3 }}>Unknown</span>
                    )}
                  </td>
                  <td style={{ padding: "9px 10px", color: C.text2 }}>
                    {item.vertical}
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <StatusBadge status={item.status} />
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      color: C.text2,
                      textAlign: "right",
                    }}
                  >
                    {item.fieldsFilled}
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      color: C.text3,
                      fontFamily: F.mono,
                      fontSize: 11,
                      textAlign: "right",
                    }}
                  >
                    {formatDate(item.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
