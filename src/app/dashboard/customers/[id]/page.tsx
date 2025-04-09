'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '../../../../components/DashboardNavbar';
import { ArrowLeftIcon, DocumentIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Document {
  id: string;
  documentType: string;
  documentName: string;
  documentYear: string;
  isTimeless: boolean;
  expiryDate: string | null;
  file: File | null;
  status: 'valid' | 'warning' | 'expired';
}

interface Customer {
  id: number;
  name: string;
  type: 'corporate' | 'individual' | 'foreign';
  customerType: string;
  accountNumber: string;
  referenceNumber: string;
  reference: string;
  operationYear: string;
  country: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  companyName: string;
  occupation: string;
  taxNumber: string;
  authorizedPersons: Array<{
    id: string;
    identityNumber: string;
    firstName: string;
    lastName: string;
    motherName: string;
    fatherName: string;
    birthDate: string;
    birthPlace: string;
  }>;
  documents: Document[];
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [activeSection, setActiveSection] = useState<'info' | 'documents'>('info');

  // Örnek veri - Gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı simülasyonu
    const mockCustomer: Customer = {
      id: parseInt(params.id),
      name: 'ABC Teknoloji Ltd. Şti.',
      type: 'corporate',
      customerType: 'Kurumsal',
      accountNumber: 'ACC123',
      referenceNumber: 'REF456',
      reference: 'John Doe',
      operationYear: '2024',
      country: 'Türkiye',
      city: 'İstanbul',
      district: 'Kadıköy',
      address: 'Örnek Mah. Test Sok. No:1',
      phone: '+90 555 123 4567',
      email: 'info@abc.com',
      website: 'www.abc.com',
      companyName: 'ABC Teknoloji Ltd. Şti.',
      occupation: 'Yazılım',
      taxNumber: '1234567890',
      authorizedPersons: [
        {
          id: '1',
          identityNumber: '12345678901',
          firstName: 'John',
          lastName: 'Doe',
          motherName: 'Jane',
          fatherName: 'Jack',
          birthDate: '1990-01-01',
          birthPlace: 'İstanbul'
        }
      ],
      documents: [
        {
          id: '1',
          documentType: 'Vergi Levhası',
          documentName: 'Vergi Levhası 2024',
          documentYear: '2024',
          isTimeless: false,
          expiryDate: '2024-12-31',
          file: null,
          status: 'valid'
        },
        {
          id: '2',
          documentType: 'İmza Sirküleri',
          documentName: 'İmza Sirküleri 2024',
          documentYear: '2024',
          isTimeless: false,
          expiryDate: '2024-06-15',
          file: null,
          status: 'warning'
        }
      ]
    };

    setCustomer(mockCustomer);
  }, [params.id]);

  const getStatusColor = (status: 'valid' | 'warning' | 'expired') => {
    switch (status) {
      case 'valid':
        return 'bg-green-50 text-green-700';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700';
      case 'expired':
        return 'bg-red-50 text-red-700';
    }
  };

  const getStatusIcon = (status: 'valid' | 'warning' | 'expired') => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'expired':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <main className="p-6 lg:p-8 mt-[64px]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              Yükleniyor...
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="p-6 lg:p-8 mt-[84px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Listeye Dön
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Üst Başlık */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{customer.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Müşteri ID: {customer.id} | Müşteri Tipi: {customer.customerType}
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="border-b border-gray-200 bg-white">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveSection('info')}
                  className={
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ' +
                    (activeSection === 'info'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                  }
                >
                  Müşteri Bilgileri
                </button>
                <button
                  onClick={() => setActiveSection('documents')}
                  className={
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ' +
                    (activeSection === 'documents'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                  }
                >
                  Evraklar
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="px-4 py-5 sm:p-6">
              {activeSection === 'info' ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Genel Bilgiler */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Genel Bilgiler</h4>
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Hesap Numarası</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.accountNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Referans Numarası</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.referenceNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Referans</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.reference}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Operasyon Yılı</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.operationYear}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* İletişim Bilgileri */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h4>
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Adres</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {customer.address}, {customer.district}/{customer.city}/{customer.country}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">E-posta</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Website</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.website}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Firma Bilgileri */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Firma Bilgileri</h4>
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Firma Adı</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.companyName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Faaliyet Alanı</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.occupation}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Vergi Numarası</dt>
                        <dd className="mt-1 text-sm text-gray-900">{customer.taxNumber}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Yetkili Kişiler */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Yetkili Kişiler</h4>
                    {customer.authorizedPersons.map((person) => (
                      <dl key={person.id} className="grid grid-cols-1 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                          <dd className="mt-1 text-sm text-gray-900">{person.firstName} {person.lastName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">TC Kimlik No</dt>
                          <dd className="mt-1 text-sm text-gray-900">{person.identityNumber}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Anne/Baba Adı</dt>
                          <dd className="mt-1 text-sm text-gray-900">{person.motherName} / {person.fatherName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Doğum Yeri/Tarihi</dt>
                          <dd className="mt-1 text-sm text-gray-900">{person.birthPlace}, {new Date(person.birthDate).toLocaleDateString('tr-TR')}</dd>
                        </div>
                      </dl>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {customer.documents.map((document) => (
                    <div
                      key={document.id}
                      className="relative flex flex-col bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-900">{document.documentName}</h3>
                          </div>
                          {getStatusIcon(document.status)}
                        </div>
                        <div className="mt-4 space-y-2">
                          <div>
                            <dt className="text-xs font-medium text-gray-500">Evrak Tipi</dt>
                            <dd className="text-sm text-gray-900">{document.documentType}</dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">Yıl</dt>
                            <dd className="text-sm text-gray-900">{document.documentYear}</dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-gray-500">Son Geçerlilik</dt>
                            <dd className="text-sm text-gray-900">
                              {document.isTimeless ? 'Süresiz' : document.expiryDate ? new Date(document.expiryDate).toLocaleDateString('tr-TR') : '-'}
                            </dd>
                          </div>
                        </div>
                      </div>
                      <div className={
                        'px-4 py-3 bg-opacity-50 text-sm font-medium ' +
                        getStatusColor(document.status)
                      }>
                        {document.status === 'valid' && 'Geçerli'}
                        {document.status === 'warning' && 'Yakında Süresi Dolacak'}
                        {document.status === 'expired' && 'Süresi Dolmuş'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
