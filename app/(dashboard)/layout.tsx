import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  Upload,
  Play,
  Search
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Database", href: "/database", icon: Database },
  { name: "Verticals", href: "/verticals", icon: TrendingUp },
  { name: "Ingestion", href: "/ingestion", icon: Upload },
  { name: "Operations", href: "/operations", icon: Play },
  { name: "Research", href: "/research", icon: Search },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0a1628]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#162944] border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white">Refyne Data</h1>
          <p className="text-sm text-gray-400 mt-1">Internal Ops</p>
        </div>

        <nav className="px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-[#1a3250] hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4">
          <UserButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
