'use client';

import { useState } from 'react';
import NewCustomerModal from '../../../components/NewCustomerModal';
import EditCustomerModal from '../../../components/EditCustomerModal';
import DashboardNavbar from '../../../components/DashboardNavbar';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';

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
  referenceNumber: string;
  accountNumber: string;
  documents: CustomerDocuments;
}

const customers: Customer[] = [
  {
    id: 1,
    name: 'ABC Teknoloji Ltd. Şti.',
    type: 'corporate',
    referenceNumber: 'REF001',
    accountNumber: 'ACC001',
    documents: {
      vergiLevhasi: { status: 'valid', expiryDate: '2024-12-31' },
      imzaSirkuleri: { status: 'warning', expiryDate: '2024-06-15' },
      faaliyetBelgesi: { status: 'expired', expiryDate: '2024-03-01' },
      ticaretSicili: { status: 'valid', expiryDate: null }
    }
  },
  {
    id: 2,
    name: 'Ahmet Yılmaz',
    type: 'individual',
    referenceNumber: 'REF002',
    accountNumber: 'ACC002',
    documents: {
      kimlikKopyasi: { status: 'valid', expiryDate: null },
      ikametgahBelgesi: { status: 'warning', expiryDate: '2024-07-01' },
      sabikaBelgesi: { status: 'valid', expiryDate: '2024-12-31' }
    }
  },
  {
    id: 3,
    name: 'Foreign Corp Inc.',
    type: 'foreign',
    referenceNumber: 'REF003',
    accountNumber: 'ACC003',
    documents: {
      apostille: { status: 'valid', expiryDate: '2024-12-31' },
      tercume: { status: 'warning', expiryDate: '2024-08-15' },
      yetkilendirme: { status: 'valid', expiryDate: '2024-12-31' }
    }
  }
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedType, setSelectedType] = useState<CustomerType>('all');
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<{ isOpen: boolean; customerId: number | null; customerData: any }>({ 
    isOpen: false, 
    customerId: null,
    customerData: null
  });

  const filteredCustomers = customers.filter(customer => {
    const typeMatch = selectedType === 'all' ? true : customer.type === selectedType;
    const searchMatch = searchTerm === '' ? true :
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  const getStatusColor = (status: DocumentStatus): string => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="p-6 lg:p-8 mt-[84px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Müşteriler</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Tüm müşterilerinizin listesi ve evrak durumları
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => setIsNewCustomerModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Yeni Müşteri
                </button>
              </div>
            </div>

            {/* Müşteri Tipleri */}
            <div className="mt-8">
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-4 py-2 rounded-md ${selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Tüm Müşteriler
                  </button>
                  <button
                    onClick={() => setSelectedType('corporate')}
                    className={`px-4 py-2 rounded-md ${selectedType === 'corporate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Tüzel Müşteri
                  </button>
                  <button
                    onClick={() => setSelectedType('individual')}
                    className={`px-4 py-2 rounded-md ${selectedType === 'individual' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Bireysel Müşteri
                  </button>
                  <button
                    onClick={() => setSelectedType('foreign')}
                    className={`px-4 py-2 rounded-md ${selectedType === 'foreign' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Yabancı Müşteri
                  </button>
                </div>
              </div>
            </div>

            {/* Arama Alanı */}
            <div className="mt-8">
              <div className="max-w-2xl w-full lg:max-w-xl">
                <label htmlFor="search" className="sr-only">Ara</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="Müşteri adı, referans no veya cari hesap no ile ara..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Müşteri Tablosu */}
            <div className="mt-8 overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                        Müşteri Adı
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Referans No
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Cari Hesap No
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Müşteri Tipi
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Evrak Durumu
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-6">
                        <span className="sr-only">Düzenle</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <button
                            onClick={() => window.location.href = `/dashboard/customers/${customer.id}`}
                            className="text-gray-900 hover:text-blue-600 text-left"
                          >
                            {customer.name}
                          </button>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.referenceNumber}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.accountNumber}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.type === 'corporate' ? 'Kurumsal' : customer.type === 'individual' ? 'Bireysel' : 'Yabancı'}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            {Object.entries(customer.documents).map(([key, doc]) => (
                              <span
                                key={key}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}
                                title={`${key}: ${doc.status === 'valid' ? 'Geçerli' : doc.status === 'warning' ? 'Yakında Süresi Dolacak' : 'Süresi Dolmuş'}`}
                              >
                                •
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setEditModalData({ 
                              isOpen: true, 
                              customerId: customer.id,
                              customerData: {
                                customerType: customer.type,
                                accountNumber: customer.accountNumber,
                                referenceNumber: customer.referenceNumber,
                                reference: '',
                                operationYear: '',
                                country: '',
                                city: '',
                                district: '',
                                address: '',
                                phone: '',
                                email: '',
                                website: '',
                                companyName: '',
                                occupation: '',
                                taxNumber: '',
                                authorizedPersons: [],
                                documents: []
                              }
                            })}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Yeni Müşteri Modalı */}
        <NewCustomerModal
          isOpen={isNewCustomerModalOpen}
          onClose={() => setIsNewCustomerModalOpen(false)}
        />

        {/* Müşteri Düzenleme Modalı */}
        {editModalData.isOpen && editModalData.customerId && (
          <EditCustomerModal
            isOpen={editModalData.isOpen}
            onClose={() => setEditModalData({ isOpen: false, customerId: null, customerData: null })}
            customerId={editModalData.customerId}
            customerData={editModalData.customerData}
          />
        )}
      </main>
    </div>
  );
}
