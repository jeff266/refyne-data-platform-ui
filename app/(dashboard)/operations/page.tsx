export default function OperationsPage() {
  const jobs = [
    {
      id: "cache-sync",
      name: "Cache Sync",
      description: "Sync Refyne cache to Supabase",
      lastRun: "2 hours ago",
      status: "success",
      disabled: true,
    },
    {
      id: "cleanup",
      name: "Cache Cleanup",
      description: "Remove stale cache entries (>90 days)",
      lastRun: "1 day ago",
      status: "success",
      disabled: true,
    },
    {
      id: "vertical-analysis",
      name: "Vertical Analysis",
      description: "Analyze industry distribution",
      lastRun: "5 hours ago",
      status: "success",
      disabled: true,
    },
    {
      id: "cost-report",
      name: "Cost Report",
      description: "Generate monthly cost analysis",
      lastRun: "1 week ago",
      status: "pending",
      disabled: true,
    },
  ];

  const recentRuns = [
    {
      job: "Cache Sync",
      startedAt: "2026-05-26 12:00:00",
      duration: "45s",
      status: "success",
      records: 1234,
    },
    {
      job: "Vertical Analysis",
      startedAt: "2026-05-26 08:15:00",
      duration: "12s",
      status: "success",
      records: 47821,
    },
    {
      job: "Cache Cleanup",
      startedAt: "2026-05-25 23:00:00",
      duration: "2m 15s",
      status: "success",
      records: 342,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Operations</h1>
        <p className="text-gray-400 mt-2">
          Trigger and monitor background jobs
        </p>
      </div>

      {/* Job Triggers */}
      <div className="bg-[#162944] border border-gray-800 mb-8">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Available Jobs</h2>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-medium mb-1">{job.name}</h3>
                  <p className="text-sm text-gray-400">{job.description}</p>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium ${
                    job.status === "success"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-yellow-900/30 text-yellow-400"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Last run: {job.lastRun}
              </p>
              <button
                disabled={job.disabled}
                className="w-full px-4 py-2 bg-gray-700 text-gray-500 cursor-not-allowed"
              >
                Trigger Job (Coming Soon)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Job Runs */}
      <div className="bg-[#162944] border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Recent Runs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a3250]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Started At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Records
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentRuns.map((run, idx) => (
                <tr key={idx} className="hover:bg-[#1a3250]">
                  <td className="px-6 py-4 text-sm text-white">{run.job}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {run.startedAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {run.duration}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {run.records.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400">
                      {run.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
