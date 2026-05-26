export default function OverviewPage() {
  const stats = [
    {
      label: "Total Companies",
      value: "47,821",
      change: "+2,341 this week",
      trend: "up",
    },
    {
      label: "Hit Rate",
      value: "71%",
      change: "+3% from last month",
      trend: "up",
    },
    {
      label: "Cost Saved",
      value: "$127,438",
      change: "vs GraphIQ pricing",
      trend: "neutral",
    },
    {
      label: "Avg Response Time",
      value: "1.2s",
      change: "Serper + DeepSeek",
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 mt-2">
          Refyne Search platform metrics and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#162944] border border-gray-800 p-6"
          >
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#162944] border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a3250]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Vertical
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Fields
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentActivity.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#1a3250]">
                  <td className="px-6 py-4 text-sm text-white">{item.domain}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.vertical}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium ${
                        item.status === "enriched"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-blue-900/30 text-blue-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.fields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
