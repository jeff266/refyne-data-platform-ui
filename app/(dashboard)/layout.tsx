"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  ChartBar,
  Upload,
  Play,
  Search
} from "lucide-react";
import { C, F } from "@/lib/design-tokens";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard, section: "monitor" },
  { name: "Database", href: "/database", icon: Database, section: "monitor" },
  { name: "Verticals", href: "/verticals", icon: ChartBar, section: "monitor" },
  { name: "Ingestion", href: "/ingestion", icon: Upload, section: "manage" },
  { name: "Operations", href: "/operations", icon: Play, section: "manage" },
  { name: "Research", href: "/research", icon: Search, section: "manage" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg }}>
      {/* Sidebar */}
      <aside style={{
        width: 176,
        background: C.sidebar,
        borderRight: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{
          padding: 16,
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.text,
            letterSpacing: '-0.3px',
          }}>
            Refyne <span style={{ color: C.indigo }}>Data</span>
          </div>
          <div style={{
            fontSize: 10,
            color: C.text3,
            marginTop: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Internal Ops
          </div>
        </div>

        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {/* Monitor Section */}
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            color: C.text3,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            padding: '0 8px',
            marginBottom: 4,
          }}>
            Monitor
          </div>
          {navigation.filter(item => item.section === 'monitor').map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  color: isActive ? C.indigoLt : C.text2,
                  fontSize: 12,
                  fontWeight: 500,
                  transition: 'all 0.1s',
                  marginBottom: 1,
                  background: isActive ? C.indigoDim : 'transparent',
                  textDecoration: 'none',
                }}
              >
                <Icon style={{ fontSize: 15, width: 15, height: 15 }} />
                {item.name}
              </Link>
            );
          })}

          <div style={{ height: 12 }} />

          {/* Manage Section */}
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            color: C.text3,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            padding: '0 8px',
            marginBottom: 4,
          }}>
            Manage
          </div>
          {navigation.filter(item => item.section === 'manage').map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  color: isActive ? C.indigoLt : C.text2,
                  fontSize: 12,
                  fontWeight: 500,
                  transition: 'all 0.1s',
                  marginBottom: 1,
                  background: isActive ? C.indigoDim : 'transparent',
                  textDecoration: 'none',
                }}
              >
                <Icon style={{ fontSize: 15, width: 15, height: 15 }} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ position: 'absolute', bottom: 24, left: 16 }}>
          <UserButton />
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
