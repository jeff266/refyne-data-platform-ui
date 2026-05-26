"use client";

import { useState } from "react";
import { Search } from "lucide-react";

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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Database</h1>
        <p className="text-gray-400 mt-2">
          Browse {mockCompanies.length.toLocaleString()} cached companies
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by domain or company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#162944] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          className="px-4 py-2 bg-[#162944] border border-gray-700 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Verticals</option>
          <option value="ABA Therapy">ABA Therapy</option>
          <option value="SaaS">SaaS</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#162944] border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a3250]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Vertical
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Cached
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((company) => (
                <tr key={company.domain} className="hover:bg-[#1a3250]">
                  <td className="px-6 py-4 text-sm text-blue-400">{company.domain}</td>
                  <td className="px-6 py-4 text-sm text-white">{company.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{company.vertical}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{company.employees}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{company.revenue}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{company.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{company.cached_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
