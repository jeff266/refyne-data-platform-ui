"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

const mockCompanies = [
  {
    domain: "therapycare.com",
    name: "Therapy Care ABA",
    vertical: "ABA Therapy",
    employees: 45,
    revenue: "$4.2M",
    phone: "555-0123",
    cached_at: "2026-05-26",
  },
  {
    domain: "autismpartners.org",
    name: "Autism Partners",
    vertical: "ABA Therapy",
    employees: 78,
    revenue: "$8.1M",
    phone: "555-0124",
    cached_at: "2026-05-25",
  },
  {
    domain: "datadog.com",
    name: "Datadog",
    vertical: "SaaS",
    employees: 4200,
    revenue: "$1.2B",
    phone: "555-0125",
    cached_at: "2026-05-24",
  },
  {
    domain: "applied-autism.com",
    name: "Applied Autism",
    vertical: "ABA Therapy",
    employees: 32,
    revenue: "$2.8M",
    phone: "555-0126",
    cached_at: "2026-05-26",
  },
  {
    domain: "fronteracare.com",
    name: "Frontera Health",
    vertical: "ABA Therapy",
    employees: 120,
    revenue: "$12.5M",
    phone: "888-786-7889",
    cached_at: "2026-05-26",
  },
];

export default function DatabasePage() {
  const [search, setSearch] = useState("");
  const [vertical, setVertical] = useState("all");

  const filtered = mockCompanies.filter((c) => {
    const matchesSearch =
      c.domain.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase());
    const matchesVertical = vertical === "all" || c.vertical === vertical;
    return matchesSearch && matchesVertical;
  });

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
          Database
        </h1>
        <p style={{
          fontSize: 13,
          color: C.text2,
        }}>
          Browse cached companies
        </p>
      </div>

      {/* Filter Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 260 }}>
          <Search style={{
            position: 'absolute',
            left: 9,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 14,
            width: 14,
            height: 14,
            color: C.text3,
            pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Search domain or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 10px 7px 30px',
              background: C.surface,
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 6,
              color: C.text,
              fontSize: 12,
              fontFamily: F.sans,
              outline: 'none',
            }}
          />
        </div>
        <select
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          style={{
            padding: '7px 10px',
            background: C.surface,
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 6,
            color: C.text2,
            fontSize: 12,
            fontFamily: F.sans,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="all">All Verticals</option>
          <option value="ABA Therapy">ABA Therapy</option>
          <option value="SaaS">SaaS</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
        </select>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: C.text3 }}>
          {filtered.length} records
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: 0,
        overflow: 'hidden',
      }}>
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
                Company
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
                Employees
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
                Revenue
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
                Phone
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
                Cached
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((company, idx) => (
              <tr
                key={company.domain}
                style={{
                  borderBottom: idx === filtered.length - 1 ? 'none' : `1px solid rgba(255,255,255,0.04)`,
                }}
              >
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                }}>
                  {company.domain}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text,
                }}>
                  {company.name}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {company.vertical}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {company.employees}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                }}>
                  {company.revenue}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                }}>
                  {company.phone}
                </td>
                <td style={{
                  padding: '9px 10px',
                  color: C.text2,
                  fontFamily: F.mono,
                  fontSize: 11,
                  textAlign: 'right',
                }}>
                  {company.cached_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
