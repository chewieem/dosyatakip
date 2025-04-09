'use client';

import { ChangeEvent } from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';

const documentTypes = [
  { id: 'vergi_levhasi', name: 'Vergi Levhası' },
  { id: 'imza_sirkuleri', name: 'İmza Sirküleri' },
  { id: 'ticaret_sicili', name: 'Ticaret Sicili Gazetesi' },
  { id: 'faaliyet_belgesi', name: 'Faaliyet Belgesi' },
  { id: 'kimlik', name: 'Kimlik Fotokopisi' },
  { id: 'diger', name: 'Diğer' },
];

interface DocumentUploadTabProps {
  data: {
    documentType: string;
    documentName: string;
    documentYear: string;
    isTimeless: boolean;
    expiryDate: string;
    file: File | null;
  };
  onFieldChange: (field: string, value: any) => void;
}

export default function DocumentUploadTab({ data, onFieldChange }: DocumentUploadTabProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFieldChange('file', e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
        {/* Evrak Türü */}
        <div className="sm:col-span-3">
          <label htmlFor="documentType" className="block text-sm font-medium leading-6 text-gray-900">
            Evrak Türü
          </label>
          <div className="mt-2">
            <select
              id="documentType"
              name="documentType"
              value={data.documentType}
              onChange={(e) => onFieldChange('documentType', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Seçiniz</option>
              {documentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Evrak Adı */}
        <div className="sm:col-span-3">
          <label htmlFor="documentName" className="block text-sm font-medium leading-6 text-gray-900">
            Evrak Adı
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="documentName"
              name="documentName"
              value={data.documentName}
              onChange={(e) => onFieldChange('documentName', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Evrak Yılı */}
        <div className="sm:col-span-2">
          <label htmlFor="documentYear" className="block text-sm font-medium leading-6 text-gray-900">
            Evrak Yılı
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="documentYear"
              name="documentYear"
              value={data.documentYear}
              onChange={(e) => onFieldChange('documentYear', e.target.value)}
              min="1900"
              max="2100"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Süresiz mi? */}
        <div className="sm:col-span-2">
          <div className="relative flex items-start mt-8">
            <div className="flex h-6 items-center">
              <input
                id="isTimeless"
                name="isTimeless"
                type="checkbox"
                checked={data.isTimeless}
                onChange={(e) => onFieldChange('isTimeless', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="isTimeless" className="font-medium text-gray-900">
                Süresiz
              </label>
            </div>
          </div>
        </div>

        {/* Son Geçerlilik Tarihi */}
        <div className="sm:col-span-2">
          <label htmlFor="expiryDate" className="block text-sm font-medium leading-6 text-gray-900">
            Son Geçerlilik Tarihi
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={data.expiryDate}
              onChange={(e) => onFieldChange('expiryDate', e.target.value)}
              disabled={data.isTimeless}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Dosya Yükleme */}
        <div className="col-span-full">
          <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
            Dosya
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Dosya yükle</span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">veya sürükleyip bırakın</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PDF, DOC, DOCX, JPG, PNG (max. 10MB)</p>
              {data.file && (
                <p className="mt-2 text-sm text-gray-500">
                  Seçilen dosya: {data.file.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
