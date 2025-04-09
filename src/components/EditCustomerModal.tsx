'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import GeneralInfoTab from './NewCustomerModal/GeneralInfoTab';
import ContactInfoTab from './NewCustomerModal/ContactInfoTab';
import CompanyInfoTab from './NewCustomerModal/CompanyInfoTab';
import AuthorizedPersonTab from './NewCustomerModal/AuthorizedPersonTab';
import DocumentUploadTab from './NewCustomerModal/DocumentUploadTab';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: number;
  customerData: {
    // General Info
    customerType: string;
    accountNumber: string;
    referenceNumber: string;
    reference: string;
    operationYear: string;

    // Contact Info
    country: string;
    city: string;
    district: string;
    address: string;
    phone: string;
    email: string;
    website: string;

    // Company Info
    companyName: string;
    occupation: string;
    taxNumber: string;

    // Authorized Persons
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

    // Documents
    documents: Array<{
      id: string;
      documentType: string;
      documentName: string;
      documentYear: string;
      isTimeless: boolean;
      expiryDate: string | null;
      file: File | null;
    }>;
  };
}

export default function EditCustomerModal({ isOpen, onClose, customerId, customerData }: EditCustomerModalProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(customerData);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/customers/' + customerId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Müşteri güncellenirken bir hata oluştu');
      }

      onClose();
    } catch (error) {
      console.error('Müşteri güncelleme hatası:', error);
      alert('Müşteri güncellenirken bir hata oluştu');
    }
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Kapat</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
                      Müşteri Düzenle
                    </Dialog.Title>

                    {/* Tab Buttons */}
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab('general')}
                          className={'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ' + (activeTab === 'general' ? 'border-blue-500 text-blue-600' : '')}
                        >
                          Genel Bilgiler
                        </button>
                        <button
                          onClick={() => setActiveTab('contact')}
                          className={'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ' + (activeTab === 'contact' ? 'border-blue-500 text-blue-600' : '')}
                        >
                          İletişim Bilgileri
                        </button>
                        <button
                          onClick={() => setActiveTab('company')}
                          className={'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ' + (activeTab === 'company' ? 'border-blue-500 text-blue-600' : '')}
                        >
                          Firma Bilgileri
                        </button>
                        <button
                          onClick={() => setActiveTab('authorized')}
                          className={'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ' + (activeTab === 'authorized' ? 'border-blue-500 text-blue-600' : '')}
                        >
                          Yetkili Kişiler
                        </button>
                        <button
                          onClick={() => setActiveTab('documents')}
                          className={'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ' + (activeTab === 'documents' ? 'border-blue-500 text-blue-600' : '')}
                        >
                          Evraklar
                        </button>
                      </nav>
                    </div>

                    {/* Tab Contents */}
                    <div className="mt-4">
                      {activeTab === 'general' && (
                        <GeneralInfoTab
                          data={formData}
                          onFieldChange={handleFieldChange}
                        />
                      )}
                      {activeTab === 'contact' && (
                        <ContactInfoTab
                          data={formData}
                          onFieldChange={handleFieldChange}
                        />
                      )}
                      {activeTab === 'company' && (
                        <CompanyInfoTab
                          data={formData}
                          onFieldChange={handleFieldChange}
                        />
                      )}
                      {activeTab === 'authorized' && (
                        <AuthorizedPersonTab
                          data={formData}
                          onFieldChange={handleFieldChange}
                        />
                      )}
                      {activeTab === 'documents' && (
                        <div className="space-y-6 py-6">
                          {formData.documents.map((document, index) => (
                            <DocumentUploadTab
                              key={document.id}
                              data={{
                                documentType: document.documentType,
                                documentName: document.documentName,
                                documentYear: document.documentYear,
                                isTimeless: document.isTimeless,
                                expiryDate: document.expiryDate || '',
                                file: document.file
                              }}
                              onFieldChange={(field, value) => {
                                const updatedDocuments = [...formData.documents];
                                updatedDocuments[index] = {
                                  ...updatedDocuments[index],
                                  [field]: value
                                };
                                handleFieldChange('documents', updatedDocuments);
                              }}
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const newDocument = {
                                id: Date.now().toString(),
                                documentType: '',
                                documentName: '',
                                documentYear: '',
                                isTimeless: false,
                                expiryDate: null,
                                file: null
                              };
                              handleFieldChange('documents', [...formData.documents, newDocument]);
                            }}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Yeni Evrak Ekle
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
