'use client';

import { Fragment, useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import GeneralInfoTab from './NewCustomerModal/GeneralInfoTab';
import ContactInfoTab from './NewCustomerModal/ContactInfoTab';
import CompanyInfoTab from './NewCustomerModal/CompanyInfoTab';
import AuthorizedPersonTab from './NewCustomerModal/AuthorizedPersonTab';

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewCustomerModal({ isOpen, onClose }: NewCustomerModalProps) {
  const [activeTab, setActiveTab] = useState('general'); // general, contact, company, authorized

  const [formData, setFormData] = useState<{
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
    identityNumber: string;
    firstName: string;
    lastName: string;
    motherName: string;
    fatherName: string;
    birthDate: string;
    birthPlace: string;
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
  }>({
    // Genel Bilgiler
    customerType: '',
    accountNumber: '',
    referenceNumber: '',
    reference: '',
    operationYear: '',

    // İletişim Bilgileri
    country: '',
    city: '',
    district: '',
    address: '',
    phone: '',
    email: '',
    website: '',

    // Şirket Bilgileri
    companyName: '',
    occupation: '',
    taxNumber: '',

    // Yetkilendirilmiş Kişi
    identityNumber: '',
    firstName: '',
    lastName: '',
    motherName: '',
    fatherName: '',
    birthDate: '',
    birthPlace: '',
    authorizedPersons: [{  // En az bir yetkili kişi
      id: Date.now().toString(),
      identityNumber: '',
      firstName: '',
      lastName: '',
      motherName: '',
      fatherName: '',
      birthDate: '',
      birthPlace: ''
    }]
  });

  const handleFieldChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Kapat</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      Yeni Müşteri Kaydı
                    </Dialog.Title>

                    {/* Sekme Butonları */}
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab('general')}
                          className={`${
                            activeTab === 'general'
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          Genel Bilgiler
                        </button>
                        <button
                          onClick={() => setActiveTab('contact')}
                          className={`${
                            activeTab === 'contact'
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          İletişim Bilgileri
                        </button>
                        <button
                          onClick={() => setActiveTab('company')}
                          className={`${
                            activeTab === 'company'
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          Şirket Bilgileri
                        </button>
                        <button
                          onClick={() => setActiveTab('authorized')}
                          className={`${
                            activeTab === 'authorized'
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          Yetkilendirilmiş Kişiler
                        </button>
                      </nav>
                    </div>

                    {/* Form içeriği */}
                    <div className="mt-4">
                      {activeTab === 'general' && (
                        <GeneralInfoTab
                          data={{
                            customerType: formData.customerType,
                            accountNumber: formData.accountNumber,
                            referenceNumber: formData.referenceNumber,
                            reference: formData.reference,
                            operationYear: formData.operationYear
                          }}
                          onChange={handleFieldChange}
                        />
                      )}

                      {activeTab === 'contact' && (
                        <ContactInfoTab
                          data={{
                            country: formData.country,
                            city: formData.city,
                            district: formData.district,
                            address: formData.address,
                            phone: formData.phone,
                            email: formData.email,
                            website: formData.website
                          }}
                          onChange={handleFieldChange}
                        />
                      )}

                      {activeTab === 'company' && (
                        <CompanyInfoTab
                          data={{
                            companyName: formData.companyName,
                            occupation: formData.occupation,
                            taxNumber: formData.taxNumber
                          }}
                          onChange={handleFieldChange}
                        />
                      )}

                      {activeTab === 'authorized' && (
                        <AuthorizedPersonTab
                          data={{
                            authorizedPersons: formData.authorizedPersons
                          }}
                          onChange={handleFieldChange}
                        />
                      )}
                    </div>

                    {/* Kaydet ve İptal butonları */}
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          console.log('Kaydedilen veriler:', formData);
                          // TODO: API'ye kaydetme işlemi eklenecek
                          onClose();
                        }}
                      >
                        Kaydet
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={onClose}
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
