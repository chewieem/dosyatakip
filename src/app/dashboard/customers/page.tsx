'use client';

import { useState } from 'react';
import DashboardNavbar from '../../../components/DashboardNavbar';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

type CustomerType = 'all' | 'corporate' | 'individual' | 'foreign';
type DocumentStatus = 'valid' | 'warning' | 'expired';

interface Document {
  status: DocumentStatus;
  expiryDate: string | null;
}

interface CustomerDocuments {
  [key: string]: Document;
}

interface Customer {
  id: number;
  name: string;
  type: CustomerType;
  documents: CustomerDocuments;
}

interface DocumentHeader {
  key: string;
  label: string;
}

type DocumentHeaders = {
  [K in CustomerType]: DocumentHeader[];
};

const documentHeaders: DocumentHeaders & { all: DocumentHeader[] } = {
  all: [
    { key: 'type', label: 'Müşteri Tipi' },
    { key: 'mainDocument', label: 'Ana Belge' }
  ],
  corporate: [
    { key: 'vergiLevhasi', label: 'Vergi Levhası' },
    { key: 'imzaSirkuleri', label: 'İmza Sirküleri' },
    { key: 'faaliyetBelgesi', label: 'Faaliyet Belgesi' },
    { key: 'ticaretSicili', label: 'Ticaret Sicili' },
  ],
  individual: [
    { key: 'kimlikKopyasi', label: 'Kimlik Kopyası' },
    { key: 'ikametgahBelgesi', label: 'İkametgah Belgesi' },
    { key: 'sabikaBelgesi', label: 'Sabıka Kaydı' },
  ],
  foreign: [
    { key: 'apostille', label: 'Apostil Belge' },
    { key: 'tercume', label: 'Tercüme' },
    { key: 'yetkilendirme', label: 'Yetkilendirme' },
  ],
};

const customers: Customer[] = [
  {
    id: 1,
    name: 'ABC Teknoloji Ltd. Şti.',
    type: 'corporate',
    documents: {
      vergiLevhasi: { status: 'valid', expiryDate: '2025-12-31' },
      imzaSirkuleri: { status: 'warning', expiryDate: '2025-06-15' },
      faaliyetBelgesi: { status: 'expired', expiryDate: '2024-12-31' },
      ticaretSicili: { status: 'valid', expiryDate: '2026-01-01' },
    }
  },
  {
    id: 2,
    name: 'John Doe',
    type: 'individual',
    documents: {
      kimlikKopyasi: { status: 'valid', expiryDate: null },
      ikametgahBelgesi: { status: 'warning', expiryDate: '2025-05-01' },
      sabikaBelgesi: { status: 'valid', expiryDate: '2025-12-31' },
    }
  },
  {
    id: 3,
    name: 'Foreign Corp Inc.',
    type: 'foreign',
    documents: {
      apostille: { status: 'valid', expiryDate: '2025-12-31' },
      tercume: { status: 'warning', expiryDate: '2025-06-01' },
      yetkilendirme: { status: 'valid', expiryDate: '2026-01-01' },
    }
  },
];

export default function CustomersPage() {
  const [activeType, setActiveType] = useState<CustomerType>('all');
  const filteredCustomers = activeType === 'all' ? customers : customers.filter(customer => customer.type === activeType);

  const getStatusColor = (status: DocumentStatus): string => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string | null): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('tr-TR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="p-6 lg:p-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Üst Toolbar */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                {/* Müşteri Tipleri */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveType('all')}
                    className={`px-4 py-2 rounded-md ${activeType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Tüm Müşteriler
                  </button>
                  <button
                    onClick={() => setActiveType('corporate')}
                    className={`px-4 py-2 rounded-md ${activeType === 'corporate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Tüzel Müşteri
                  </button>
                  <button
                    onClick={() => setActiveType('individual')}
                    className={`px-4 py-2 rounded-md ${activeType === 'individual' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Bireysel Müşteri
                  </button>
                  <button
                    onClick={() => setActiveType('foreign')}
                    className={`px-4 py-2 rounded-md ${activeType === 'foreign' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Yabancı Müşteri
                  </button>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => alert('Yeni müşteri ekleme özelliği yakında eklenecek')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Yeni Müşteri
                  </button>
                  <button
                    onClick={() => alert('Dışa aktarma özelliği yakında eklenecek')}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Dışa Aktar
                  </button>
                </div>
              </div>
            </div>

            {/* Müşteri Tablosu */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Müşteri Adı
                    </th>
                    {documentHeaders[activeType].map((header) => (
                      <th
                        key={header.key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      {activeType === 'all' ? (
                        // Tüm müşteriler görünümü
                        documentHeaders.all.map((header) => {
                          if (header.key === 'type') {
                            return (
                              <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {customer.type === 'corporate' ? 'Tüzel' :
                                   customer.type === 'individual' ? 'Bireysel' :
                                   'Yabancı'}
                                </span>
                              </td>
                            );
                          } else if (header.key === 'mainDocument') {
                            // Her müşteri tipi için ana belgeyi belirle
                            const mainDocKey = customer.type === 'corporate' ? 'vergiLevhasi' :
                                              customer.type === 'individual' ? 'kimlikKopyasi' :
                                              'apostille';
                            const document = customer.documents[mainDocKey];
                            return (
                              <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                                    {document.status === 'valid' ? 'Geçerli' :
                                     document.status === 'warning' ? 'Yakında Süresi Dolacak' :
                                     document.status === 'expired' ? 'Süresi Dolmuş' : 'Belirsiz'}
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                    {formatDate(document.expiryDate)}
                                  </span>
                                </div>
                              </td>
                            );
                          }
                          return null;
                        })
                      ) : (
                        // Belirli bir müşteri tipi görünümü
                        documentHeaders[activeType].map((header) => {
                          const document = customer.documents[header.key];
                          return (
                            <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                                  {document.status === 'valid' ? 'Geçerli' :
                                   document.status === 'warning' ? 'Yakında Süresi Dolacak' :
                                   document.status === 'expired' ? 'Süresi Dolmuş' : 'Belirsiz'}
                                </span>
                                <span className="ml-2 text-gray-500">
                                  {formatDate(document.expiryDate)}
                                </span>
                              </div>
                            </td>
                          );
                        })
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
