"use client";

import { CloudUpload, FileUp } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

export default function IngestionPage() {
  const recentJobs = [
    {
      file: "aba-providers-may.csv",
      records: 1240,
      enriched: 1190,
      status: "complete",
      date: "2026-05-24",
    },
    {
      file: "frontera-contacts.csv",
      records: 312,
      enriched: 298,
      status: "complete",
      date: "2026-05-20",
    },
    {
      file: "finance-vertical-seed.csv",
      records: 2100,
      enriched: 63,
      status: "low hit rate",
      date: "2026-05-15",
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
          Ingestion
        </h1>
        <p style={{
          fontSize: 13,
          color: C.text2,
        }}>
          Upload CSV files to enrich and cache company data
        </p>
      </div>

      {/* Upload Zone */}
      <div style={{
        border: '1px dashed rgba(255,255,255,0.12)',
        borderRadius: 10,
        padding: '48px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.15s',
        marginBottom: 16,
      }}>
        <CloudUpload style={{
          fontSize: 28,
          width: 28,
          height: 28,
          color: C.text3,
          margin: '0 auto 12px',
        }} />
        <div style={{
          fontSize: 13,
          color: C.text,
          fontWeight: 500,
          marginBottom: 6,
        }}>
          Drop CSV file here or click to upload
        </div>
        <div style={{
          fontSize: 11,
          color: C.text3,
          marginBottom: 14,
        }}>
          Expected columns: domain, company_name
        </div>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '6px 14px',
          background: `linear-gradient(to bottom, ${C.indigo}, ${C.indigoDk})`,
          color: '#fff',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: F.sans,
          boxShadow: `0 0 0 1px ${C.indigoBrd}, 0 1px 3px rgba(0,0,0,0.4)`,
          border: 'none',
          cursor: 'pointer',
        }}>
          <FileUp style={{ fontSize: 13, width: 13, height: 13 }} />
          Select File
        </button>
      </div>

      {/* Recent Ingestion Jobs */}
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
            Recent Ingestion Jobs
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
                File
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
                textAlign: 'left',
                fontSize: 10,
                fontWeight: 600,
                color: C.text3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Enriched
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
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map((job, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: idx === recentJobs.length - 1 ? 'none' : `1px solid rgba(255,255,255,0.04)`,
                }}
              >
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                }}>
                  {job.file}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {job.records.toLocaleString()}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {job.enriched.toLocaleString()}
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
                    background: job.status === 'complete' ? C.greenDim : C.amberDim,
                    color: job.status === 'complete' ? C.green : C.amber,
                    border: `1px solid ${job.status === 'complete' ? C.greenBrd : C.amberBrd}`,
                  }}>
                    {job.status}
                  </span>
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                  textAlign: 'right',
                }}>
                  {job.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
