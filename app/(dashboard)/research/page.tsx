"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function ResearchPage() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleLookup = () => {
    // Mock result
    setResult({
      domain: domain || "fronteracare.com",
      company_name: "Frontera Health",
      vertical: "ABA Therapy",
      cached: true,
      data: {
        industry: {
          value: "ABA Therapy",
          confidence: 0.92,
          source: "LinkedIn + website",
          evidence: "Provides Applied Behavior Analysis therapy...",
        },
        employees: {
          value: 120,
          confidence: 0.89,
          source: "LinkedIn",
          evidence: "120 employees on LinkedIn",
        },
        revenue: {
          value: "$12.5M",
          confidence: 0.75,
          source: "Glassdoor",
          evidence: "Estimated annual revenue",
        },
        phone: {
          value: "888-786-7889",
          confidence: 0.95,
          source: "Company website",
          evidence: "Contact page",
        },
      },
      serper_calls: 3,
      deepseek_tokens: 1842,
      cost_usd: 0.0032,
      cached_at: "2026-05-26T14:23:15Z",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Research</h1>
        <p className="text-gray-400 mt-2">
          Single company lookup and debug enrichment results
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-[#162944] border border-gray-800 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Company Domain
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g., fronteracare.com"
            className="flex-1 px-4 py-2 bg-[#1a3250] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleLookup}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Lookup
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-[#162944] border border-gray-800 p-6">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Company</p>
                <p className="text-white font-medium">{result.company_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Vertical</p>
                <p className="text-white font-medium">{result.vertical}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400">
                  {result.cached ? "CACHED" : "NOT CACHED"}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Cost</p>
                <p className="text-white font-medium">
                  ${result.cost_usd.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* Field Details */}
          <div className="bg-[#162944] border border-gray-800">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white">
                Enriched Fields
              </h2>
            </div>
            <div className="divide-y divide-gray-800">
              {Object.entries(result.data).map(([field, data]: [string, any]) => (
                <div key={field} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium mb-1 capitalize">
                        {field}
                      </h3>
                      <p className="text-2xl font-bold text-white mb-2">
                        {data.value}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Confidence</p>
                      <p className="text-lg font-bold text-green-400">
                        {(data.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Source</p>
                      <p className="text-sm text-gray-300">{data.source}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Evidence</p>
                      <p className="text-sm text-gray-300">{data.evidence}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Metrics */}
          <div className="bg-[#162944] border border-gray-800 p-6">
            <h3 className="text-white font-medium mb-4">API Usage</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Serper Calls</p>
                <p className="text-2xl font-bold text-white">
                  {result.serper_calls}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">DeepSeek Tokens</p>
                <p className="text-2xl font-bold text-white">
                  {result.deepseek_tokens.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Cached At</p>
                <p className="text-sm text-gray-300">
                  {new Date(result.cached_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
