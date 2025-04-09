'use client';

import { useState } from 'react';
import DashboardNavbar from '../../components/DashboardNavbar';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  GlobeEuropeAfricaIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Örnek veri - Gerçek uygulamada API'den gelecek
const customers = {
  individual: [
    { id: 1, name: 'Ahmet Yılmaz', documentCount: 3, nextExpiryDate: '2025-05-15' },
    { id: 2, name: 'Mehmet Demir', documentCount: 2, nextExpiryDate: '2025-04-20' },
  ],
  corporate: [
    { id: 1, name: 'ABC Teknoloji Ltd. Şti.', documentCount: 5, nextExpiryDate: '2025-04-12' },
    { id: 2, name: 'XYZ Yazılım A.Ş.', documentCount: 4, nextExpiryDate: '2025-06-01' },
  ],
  foreign: [
    { id: 1, name: 'Global Tech Inc.', documentCount: 3, nextExpiryDate: '2025-04-25' },
  ],
};

// Süresi yaklaşan evraklar (30 gün içinde)
const expiringDocuments = [
  {
    id: 1,
    companyName: 'ABC Teknoloji Ltd. Şti.',
    documentName: 'Vergi Levhası',
    expiryDate: '2025-04-12',
    daysLeft: 3,
  },
  {
    id: 2,
    companyName: 'Ahmet Yılmaz',
    documentName: 'İmza Sirküleri',
    expiryDate: '2025-04-20',
    daysLeft: 11,
  },
];

function CustomerSection({ title, customers, icon: Icon, bgColor }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className={`px-6 py-4 ${bgColor} flex items-center justify-between`}>
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Icon className="h-6 w-6" />
          {title}
        </h3>
        <span className="text-white bg-white/20 px-2.5 py-1 rounded-full text-sm">
          {customers.length}
        </span>
      </div>
      <div className="p-6">
        {customers.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {customers.map((customer: any) => (
              <li key={customer.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.documentCount} Evrak</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    Son Tarih: {new Date(customer.nextExpiryDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Henüz müşteri bulunmuyor
          </p>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />
      
      <main className="p-6 lg:p-8 mt-[64px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
          {/* Süresi Yaklaşan Evraklar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-yellow-600 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ClockIcon className="h-6 w-6" />
                Süresi Yaklaşan Evraklar
              </h3>
              <span className="text-white bg-white/20 px-2.5 py-1 rounded-full text-sm">
                {expiringDocuments.length}
              </span>
            </div>
            <div className="p-6">
              {expiringDocuments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {expiringDocuments.map((doc) => (
                    <li key={doc.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.companyName}</p>
                          <p className="text-sm text-gray-500">{doc.documentName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-600">
                            {doc.daysLeft} gün kaldı
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Süresi yaklaşan evrak bulunmuyor
                </p>
              )}
            </div>
          </div>

          {/* Müşteri Kategorileri Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CustomerSection
              title="Bireysel Müşteriler"
              customers={customers.individual}
              icon={UserGroupIcon}
              bgColor="bg-blue-600"
            />
            <CustomerSection
              title="Kurumsal Müşteriler"
              customers={customers.corporate}
              icon={BuildingOfficeIcon}
              bgColor="bg-green-600"
            />
            <CustomerSection
              title="Yabancı Müşteriler"
              customers={customers.foreign}
              icon={GlobeEuropeAfricaIcon}
              bgColor="bg-purple-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
