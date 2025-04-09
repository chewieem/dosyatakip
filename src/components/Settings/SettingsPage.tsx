'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SettingsPageProps {
  darkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage({ darkMode, onDarkModeChange }: SettingsPageProps) {
  const [fontSize, setFontSize] = useState('normal'); // small, normal, large
  const [accentColor, setAccentColor] = useState('blue'); // blue, green, purple, red
  const [tableDisplay, setTableDisplay] = useState('normal'); // compact, normal, comfortable
  const [itemsPerPage, setItemsPerPage] = useState('10'); // 10, 25, 50, 100

  const fontSizeOptions = [
    { value: 'small', label: 'Küçük' },
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Büyük' }
  ];

  const accentColors = [
    { value: 'blue', label: 'Mavi', class: 'bg-blue-500' },
    { value: 'green', label: 'Yeşil', class: 'bg-green-500' },
    { value: 'purple', label: 'Mor', class: 'bg-purple-500' },
    { value: 'red', label: 'Kırmızı', class: 'bg-red-500' }
  ];

  const tableDisplayOptions = [
    { value: 'compact', label: 'Kompakt' },
    { value: 'normal', label: 'Normal' },
    { value: 'comfortable', label: 'Rahat' }
  ];

  const itemsPerPageOptions = [
    { value: '10', label: '10 öğe' },
    { value: '25', label: '25 öğe' },
    { value: '50', label: '50 öğe' },
    { value: '100', label: '100 öğe' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 py-6">
        {/* Tema Ayarları */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tema Ayarları</h2>
          <div className="mt-4 space-y-4">
            {/* Karanlık Mod */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {darkMode ? (
                  <MoonIcon className="h-6 w-6 text-gray-400" />
                ) : (
                  <SunIcon className="h-6 w-6 text-gray-400" />
                )}
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                  Karanlık Mod
                </span>
              </div>
              <Switch
                checked={darkMode}
                onChange={onDarkModeChange}
                className={classNames(
                  darkMode ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    darkMode ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            {/* Font Boyutu */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Font Boyutu</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tema Rengi */}
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Tema Rengi</span>
              <div className="mt-2 flex items-center space-x-3">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={classNames(
                      color.class,
                      'h-8 w-8 rounded-full ring-2 ring-transparent',
                      accentColor === color.value ? 'ring-2 ring-offset-2' : ''
                    )}
                    onClick={() => setAccentColor(color.value)}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Görünüm Tercihleri */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Görünüm Tercihleri</h2>
          <div className="mt-4 space-y-4">
            {/* Tablo Görünümü */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Tablo Görünümü</span>
              <select
                value={tableDisplay}
                onChange={(e) => setTableDisplay(e.target.value)}
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                {tableDisplayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sayfa Başına Öğe */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Sayfa Başına Öğe
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bildirim Ayarları</h2>
          <div className="mt-4 space-y-4">
            {/* E-posta Bildirimleri */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                E-posta Bildirimleri
              </span>
              <Switch
                checked={true}
                onChange={() => {}}
                className={classNames(
                  'bg-blue-600',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    'translate-x-5',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            {/* Masaüstü Bildirimleri */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Masaüstü Bildirimleri
              </span>
              <Switch
                checked={true}
                onChange={() => {}}
                className={classNames(
                  'bg-blue-600',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    'translate-x-5',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
