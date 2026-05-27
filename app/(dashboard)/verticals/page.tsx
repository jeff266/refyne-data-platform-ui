import { ArrowUpRight, AlertTriangle } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

export default function VerticalsPage() {
  const verticals = [
    {
      name: "ABA Therapy",
      cached: 26834,
      total: 47821,
      percentage: 56,
      color: C.indigo,
    },
    {
      name: "Healthcare",
      cached: 9564,
      total: 47821,
      percentage: 20,
      color: C.indigo,
    },
    {
      name: "Education",
      cached: 5739,
      total: 47821,
      percentage: 12,
      color: C.indigo,
    },
    {
      name: "SaaS",
      cached: 1913,
      total: 47821,
      percentage: 4,
      color: C.indigo,
    },
    {
      name: "Finance",
      cached: 1435,
      total: 47821,
      percentage: 3,
      color: C.amber,
    },
    {
      name: "Other",
      cached: 2336,
      total: 47821,
      percentage: 5,
      color: C.text3,
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: 20,
          fontWeight: 600,
          color: C.text,
          marginBottom: 8,
        }}>
          Verticals
        </h1>
        <p style={{
          fontSize: 13,
          color: C.text2,
        }}>
          Coverage breakdown by industry
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 20,
      }}>
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 500,
            color: C.text3,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 8,
          }}>
            Total Verticals
          </div>
          <div style={{
            fontSize: 22,
            fontWeight: 600,
            color: C.text,
            letterSpacing: '-0.5px',
            marginBottom: 4,
          }}>
            {verticals.length}
          </div>
          <div style={{
            fontSize: 11,
            color: C.text2,
          }}>
            Configured
          </div>
        </div>

        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 500,
            color: C.text3,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 8,
          }}>
            Best Coverage
          </div>
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            color: C.text,
            letterSpacing: '-0.5px',
            paddingTop: 3,
            marginBottom: 4,
          }}>
            ABA Therapy
          </div>
          <div style={{
            fontSize: 11,
            color: C.green,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}>
            <ArrowUpRight style={{ width: 12, height: 12 }} />
            56% cached
          </div>
        </div>

        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 500,
            color: C.text3,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 8,
          }}>
            Needs Improvement
          </div>
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            color: C.text,
            letterSpacing: '-0.5px',
            paddingTop: 3,
            marginBottom: 4,
          }}>
            Finance
          </div>
          <div style={{
            fontSize: 11,
            color: C.amber,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}>
            <AlertTriangle style={{ width: 12, height: 12 }} />
            3% cached
          </div>
        </div>
      </div>

      {/* Vertical Breakdown Card */}
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: 16,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
          }}>
            Coverage by Vertical
          </span>
          <span style={{ fontSize: 11, color: C.text3 }}>
            47,821 total companies
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {verticals.map((vertical) => (
            <div key={vertical.name}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.text,
                }}>
                  {vertical.name}
                </span>
                <span style={{ fontSize: 11, color: C.text2 }}>
                  {vertical.cached.toLocaleString()} companies{' '}
                  <span style={{
                    color: vertical.name === 'Finance' ? C.amber : C.indigo,
                    fontWeight: 600,
                  }}>
                    {vertical.percentage}%
                  </span>
                </span>
              </div>
              <div style={{
                height: 7,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${vertical.percentage}%`,
                  background: vertical.color,
                  borderRadius: 3,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
