'use client';

import { useTheme } from '@/context/ThemeContext';
import SettingsPage from '@/components/Settings/SettingsPage';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Ayarlar
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <SettingsPage darkMode={darkMode} onDarkModeChange={toggleDarkMode} />
          </div>
        </main>
      </div>
    </div>
  );
}
