import { ArrowUpRight } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

export default function OverviewPage() {
  const stats = [
    {
      label: "Total Companies",
      value: "47,821",
      delta: "+2,341 this week",
      trend: "up",
    },
    {
      label: "Hit Rate",
      value: "71%",
      delta: "+3% from last month",
      trend: "up",
    },
    {
      label: "Cost Saved",
      value: "$127K",
      delta: "vs GraphIQ pricing",
      trend: "neutral",
    },
    {
      label: "Avg Response",
      value: "1.2s",
      delta: "Serper + DeepSeek",
      trend: "neutral",
    },
  ];

  const recentActivity = [
    { domain: "therapycare.com", vertical: "ABA Therapy", status: "enriched", fields: 4 },
    { domain: "autismpartners.org", vertical: "ABA Therapy", status: "enriched", fields: 5 },
    { domain: "datadog.com", vertical: "SaaS", status: "cache_hit", fields: 3 },
    { domain: "applied-autism.com", vertical: "ABA Therapy", status: "enriched", fields: 4 },
    { domain: "stripe.com", vertical: "SaaS", status: "cache_hit", fields: 5 },
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
          Overview
        </h1>
        <p style={{
          fontSize: 13,
          color: C.text2,
        }}>
          Refyne Search platform metrics and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 20,
      }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: '14px 16px',
            }}
          >
            <div style={{
              fontSize: 11,
              fontWeight: 500,
              color: C.text3,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: 8,
            }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: 22,
              fontWeight: 600,
              color: C.text,
              letterSpacing: '-0.5px',
              marginBottom: 4,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: 11,
              color: stat.trend === 'up' ? C.green : C.text2,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}>
              {stat.trend === 'up' && <ArrowUpRight style={{ width: 12, height: 12 }} />}
              {stat.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Card */}
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
          marginBottom: 14,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
          }}>
            Recent Activity
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 7px',
            background: C.indigoDim,
            color: C.indigoLt,
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 600,
            border: `1px solid ${C.indigoBrd}`,
          }}>
            Live
          </span>
        </div>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 12,
        }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              <th style={{
                padding: '8px 10px',
                textAlign: 'left',
                fontSize: 10,
                fontWeight: 600,
                color: C.text3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Domain
              </th>
              <th style={{
                padding: '8px 10px',
                textAlign: 'left',
                fontSize: 10,
                fontWeight: 600,
                color: C.text3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Vertical
              </th>
              <th style={{
                padding: '8px 10px',
                textAlign: 'left',
                fontSize: 10,
                fontWeight: 600,
                color: C.text3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Status
              </th>
              <th style={{
                padding: '8px 10px',
                textAlign: 'right',
                fontSize: 10,
                fontWeight: 600,
                color: C.text3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Fields
              </th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: idx === recentActivity.length - 1 ? 'none' : `1px solid rgba(255,255,255,0.04)`,
                }}
              >
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                }}>
                  {item.domain}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {item.vertical}
                </td>
                <td style={{ padding: '9px 10px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '2px 7px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    background: item.status === 'enriched' ? C.greenDim : C.indigoDim,
                    color: item.status === 'enriched' ? C.green : C.indigoLt,
                    border: `1px solid ${item.status === 'enriched' ? C.greenBrd : C.indigoBrd}`,
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  textAlign: 'right',
                }}>
                  {item.fields}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
