import { ArrowUpRight, AlertTriangle } from "lucide-react";
import { C } from "@/lib/design-tokens";

interface Vertical {
  name: string;
  count: number;
  percentage: number;
}

interface VerticalsData {
  total: number;
  verticals: Vertical[];
  best: { name: string; percentage: number } | null;
  worst: { name: string; percentage: number } | null;
}

async function getVerticals(): Promise<VerticalsData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/verticals`,
      { next: { revalidate: 300 } } // cache for 5 minutes
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function VerticalsPage() {
  const data = await getVerticals();

  const verticals = data?.verticals ?? [];
  const total = data?.total ?? 0;
  const best = data?.best;
  const worst = data?.worst;

  function barColor(name: string, percentage: number) {
    if (name === worst?.name && percentage <= 5) return C.amber;
    if (name === "Other") return C.text3;
    return C.indigo;
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 8 }}
        >
          Verticals
        </h1>
        <p style={{ fontSize: 13, color: C.text2 }}>
          Coverage breakdown by industry
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
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
            Total Verticals
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: C.text,
              letterSpacing: "-0.5px",
              marginBottom: 4,
            }}
          >
            {verticals.length || "—"}
          </div>
          <div style={{ fontSize: 11, color: C.text2 }}>
            {total.toLocaleString()} total companies
          </div>
        </div>

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
            Best Coverage
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: C.text,
              letterSpacing: "-0.5px",
              paddingTop: 3,
              marginBottom: 4,
            }}
          >
            {best?.name ?? "—"}
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.green,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <ArrowUpRight style={{ width: 12, height: 12 }} />
            {best ? `${best.percentage}% of total` : "No data yet"}
          </div>
        </div>

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
            Needs Improvement
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: C.text,
              letterSpacing: "-0.5px",
              paddingTop: 3,
              marginBottom: 4,
            }}
          >
            {worst?.name ?? "—"}
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.amber,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <AlertTriangle style={{ width: 12, height: 12 }} />
            {worst ? `${worst.percentage}% of total` : "No data yet"}
          </div>
        </div>
      </div>

      {/* Breakdown Card */}
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
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
            Coverage by Vertical
          </span>
          <span style={{ fontSize: 11, color: C.text3 }}>
            {total.toLocaleString()} total companies
          </span>
        </div>

        {verticals.length === 0 ? (
          <div
            style={{
              padding: "40px 0",
              textAlign: "center",
              color: C.text3,
              fontSize: 12,
            }}
          >
            No data yet. Seed the cache to see vertical breakdown.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {verticals.map((v) => (
              <div key={v.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 500, color: C.text }}
                  >
                    {v.name}
                  </span>
                  <span style={{ fontSize: 11, color: C.text2 }}>
                    {v.count.toLocaleString()} companies{" "}
                    <span
                      style={{
                        color: barColor(v.name, v.percentage),
                        fontWeight: 600,
                      }}
                    >
                      {v.percentage}%
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: 7,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${v.percentage}%`,
                      background: barColor(v.name, v.percentage),
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
