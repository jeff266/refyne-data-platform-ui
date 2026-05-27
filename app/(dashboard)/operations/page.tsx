import { Clock } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

export default function OperationsPage() {
  const jobs = [
    {
      id: "cache-sync",
      name: "Cache Sync",
      description: "Sync Refyne cache to Supabase",
      lastRun: "2 hours ago",
      status: "success",
    },
    {
      id: "cleanup",
      name: "Cache Cleanup",
      description: "Remove stale entries older than 90 days",
      lastRun: "1 day ago",
      status: "success",
    },
    {
      id: "vertical-analysis",
      name: "Vertical Analysis",
      description: "Analyze industry distribution",
      lastRun: "5 hours ago",
      status: "success",
    },
    {
      id: "cost-report",
      name: "Cost Report",
      description: "Generate monthly cost analysis",
      lastRun: "1 week ago",
      status: "pending",
    },
  ];

  const recentRuns = [
    {
      job: "Cache Sync",
      started: "2026-05-26 12:00",
      duration: "45s",
      status: "success",
      records: 1234,
    },
    {
      job: "Vertical Analysis",
      started: "2026-05-26 08:15",
      duration: "12s",
      status: "success",
      records: 47821,
    },
    {
      job: "Cache Cleanup",
      started: "2026-05-25 23:00",
      duration: "2m 15s",
      status: "success",
      records: 342,
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
          Operations
        </h1>
        <p style={{
          fontSize: 13,
          color: C.text2,
        }}>
          Trigger and monitor background jobs
        </p>
      </div>

      {/* Jobs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 16,
      }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}>
              <div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                }}>
                  {job.name}
                </div>
                <div style={{
                  fontSize: 11,
                  color: C.text3,
                  marginTop: 3,
                  marginBottom: 10,
                }}>
                  {job.description}
                </div>
              </div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '2px 7px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 600,
                background: job.status === 'success' ? C.greenDim : C.amberDim,
                color: job.status === 'success' ? C.green : C.amber,
                border: `1px solid ${job.status === 'success' ? C.greenBrd : C.amberBrd}`,
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: job.status === 'success' ? C.green : C.amber,
                  flexShrink: 0,
                }} />
                {job.status}
              </span>
            </div>
            <div style={{
              fontSize: 11,
              color: C.text2,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}>
              <Clock style={{ fontSize: 12, width: 12, height: 12, verticalAlign: -1 }} />
              Last run: {job.lastRun}
            </div>
            <button style={{
              width: '100%',
              padding: 7,
              marginTop: 10,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              color: C.text2,
              fontSize: 11,
              fontWeight: 500,
              cursor: 'not-allowed',
              fontFamily: F.sans,
            }}>
              Trigger Job (coming soon)
            </button>
          </div>
        ))}
      </div>

      {/* Recent Runs */}
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 16px',
          borderBottom: `1px solid ${C.border}`,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
          }}>
            Recent Runs
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
                Job
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
                Started
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
                Duration
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
                Records
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
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentRuns.map((run, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: idx === recentRuns.length - 1 ? 'none' : `1px solid rgba(255,255,255,0.04)`,
                }}
              >
                <td style={{
                  padding: '9px 10px',
                  color: C.text,
                }}>
                  {run.job}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                }}>
                  {run.started}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {run.duration}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {run.records.toLocaleString()}
                </td>
                <td style={{
                  padding: '9px 10px',
                  textAlign: 'right',
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '2px 7px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    background: C.greenDim,
                    color: C.green,
                    border: `1px solid ${C.greenBrd}`,
                  }}>
                    {run.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
