'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@/providers/AuthProvider';

export default function DashboardNavbar() {
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <nav className="flex items-center justify-between py-2 px-4 lg:py-5 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/images/nextbyte.png"
              alt="Logo"
              width={200}
              height={40}
              className="h-10 w-auto lg:h-16 lg:w-auto"
              priority
            />
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold leading-6 text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Çıkış Yap
        </button>
      </nav>
    </header>
  );
}
