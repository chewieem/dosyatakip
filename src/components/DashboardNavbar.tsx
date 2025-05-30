'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '@/providers/AuthProvider';
import SettingsModal from './SettingsModal';

const navigation = [
  { name: 'Ana Sayfa', href: '/dashboard', icon: HomeIcon },
  { name: 'Takvim', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Müşteriler', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Ayarlar', href: '#', icon: Cog6ToothIcon },
];

export default function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleSettingsClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setSettingsOpen(true);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [logout, router]);

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
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Ana menüyü aç</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={item.name === 'Ayarlar' ? handleSettingsClick : undefined}
              className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleLogout}
            className="text-sm font-semibold leading-6 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Çıkış Yap
          </button>
        </div>
      </nav>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Mobile menu */}
      <div className="lg:hidden">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileMenuOpen ? 0.3 : 0 }}
          transition={{ duration: 0.2 }}
          className={`${mobileMenuOpen ? 'fixed' : 'hidden'} inset-0 bg-black z-40`}
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Menu */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-x-0 top-[64px] z-50 bg-white overflow-hidden shadow-lg border-t border-gray-100"
        >
          <div className="px-6 py-6 space-y-6">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.name === 'Ayarlar') {
                      handleSettingsClick(e);
                      setMobileMenuOpen(false);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="block rounded-lg px-4 py-3 text-base font-semibold leading-7 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-6 w-6" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
            <div className="pt-4">
              <Link
                href="/login"
                className="block rounded-lg px-4 py-3 text-base font-semibold leading-7 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-center shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Çıkış Yap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
