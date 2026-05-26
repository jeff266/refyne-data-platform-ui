export default function VerticalsPage() {
  const verticals = [
    {
      name: "ABA Therapy",
      cached: 26834,
      total: 47821,
      percentage: 56,
      color: "bg-green-500",
    },
    {
      name: "Healthcare",
      cached: 9564,
      total: 47821,
      percentage: 20,
      color: "bg-blue-500",
    },
    {
      name: "Education",
      cached: 5739,
      total: 47821,
      percentage: 12,
      color: "bg-purple-500",
    },
    {
      name: "SaaS",
      cached: 1913,
      total: 47821,
      percentage: 4,
      color: "bg-orange-500",
    },
    {
      name: "Finance",
      cached: 1435,
      total: 47821,
      percentage: 3,
      color: "bg-yellow-500",
    },
    {
      name: "Other",
      cached: 2336,
      total: 47821,
      percentage: 5,
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Verticals</h1>
        <p className="text-gray-400 mt-2">
          Coverage breakdown by industry vertical
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#162944] border border-gray-800 p-6">
          <p className="text-sm text-gray-400 mb-2">Total Verticals</p>
          <p className="text-3xl font-bold text-white">{verticals.length}</p>
        </div>
        <div className="bg-[#162944] border border-gray-800 p-6">
          <p className="text-sm text-gray-400 mb-2">Best Coverage</p>
          <p className="text-3xl font-bold text-white">ABA Therapy</p>
          <p className="text-sm text-green-400 mt-1">56% cached</p>
        </div>
        <div className="bg-[#162944] border border-gray-800 p-6">
          <p className="text-sm text-gray-400 mb-2">Needs Improvement</p>
          <p className="text-3xl font-bold text-white">Finance</p>
          <p className="text-sm text-yellow-400 mt-1">3% cached</p>
        </div>
      </div>

      {/* Vertical Breakdown */}
      <div className="bg-[#162944] border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Coverage by Vertical
        </h2>
        <div className="space-y-6">
          {verticals.map((vertical) => (
            <div key={vertical.name}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-white">{vertical.name}</p>
                  <p className="text-xs text-gray-500">
                    {vertical.cached.toLocaleString()} of {vertical.total.toLocaleString()} companies
                  </p>
                </div>
                <span className="text-lg font-bold text-white">
                  {vertical.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div
                  className={`h-3 ${vertical.color} transition-all duration-500`}
                  style={{ width: `${vertical.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
