"use client";

import { useState } from "react";
import { Search, Building } from "lucide-react";
import { C, F } from "@/lib/design-tokens";

export default function ResearchPage() {
  const [domain, setDomain] = useState("");

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
          Research
        </h1>
        <p style={{
          fontSize: 13,
          color: C.text2,
        }}>
          Single company lookup and enrichment debug
        </p>
      </div>

      {/* Lookup Card */}
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: 16,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.text,
          marginBottom: 14,
        }}>
          Company Lookup
        </div>

        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
        }}>
          <input
            type="text"
            placeholder="e.g. fronteracare.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            style={{
              flex: 1,
              padding: '9px 12px',
              background: C.surface,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 7,
              color: C.text,
              fontSize: 12,
              fontFamily: F.sans,
              outline: 'none',
              maxWidth: 480,
            }}
          />
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: `linear-gradient(to bottom, ${C.indigo}, ${C.indigoDk})`,
            color: '#fff',
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 500,
            fontFamily: F.sans,
            border: 'none',
            cursor: 'pointer',
            boxShadow: `0 0 0 1px ${C.indigoBrd}`,
          }}>
            <Search style={{ fontSize: 13, width: 13, height: 13 }} />
            Lookup
          </button>
        </div>

        <div style={{
          padding: '48px 0',
          textAlign: 'center',
        }}>
          <Building style={{
            fontSize: 32,
            width: 32,
            height: 32,
            color: '#27272A',
            margin: '0 auto 12px',
          }} />
          <div style={{
            fontSize: 13,
            color: C.text3,
          }}>
            Enter a domain to debug enrichment results
          </div>
        </div>
      </div>
    </div>
  );
}
