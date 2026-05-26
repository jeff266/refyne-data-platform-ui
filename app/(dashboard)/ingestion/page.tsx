"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function IngestionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Mock preview data
      setPreview([
        { domain: "example1.com", name: "Example Corp 1" },
        { domain: "example2.com", name: "Example Corp 2" },
        { domain: "example3.com", name: "Example Corp 3" },
      ]);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Ingestion</h1>
        <p className="text-gray-400 mt-2">
          Upload CSV files to enrich and cache company data
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-[#162944] border border-gray-800 p-8 mb-6">
        <div className="border-2 border-dashed border-gray-700 p-12 text-center">
          <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-white mb-2">Drop CSV file here or click to upload</p>
          <p className="text-sm text-gray-500 mb-4">
            Expected columns: domain, company_name
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Select File
          </label>
        </div>

        {file && (
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">Selected File:</p>
            <p className="text-white font-medium">{file.name}</p>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="bg-[#162944] border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">
              Preview (first 3 rows)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a3250]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Domain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Company Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {preview.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#1a3250]">
                    <td className="px-6 py-4 text-sm text-blue-400">{row.domain}</td>
                    <td className="px-6 py-4 text-sm text-white">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-4">
            <button
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white"
              onClick={() => {
                setFile(null);
                setPreview([]);
              }}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled
            >
              Start Ingestion (Coming Soon)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
