'use client';

import DashboardNavbar from '@/components/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DashboardNavbar />
      {children}
    </div>
  );
}
