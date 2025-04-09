interface GeneralInfoTabProps {
  data: {
    customerType: string;
    accountNumber: string;
    referenceNumber: string;
    reference: string;
    operationYear: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

export default function GeneralInfoTab({ data, onFieldChange }: GeneralInfoTabProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6 py-6">
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="customerType" className="block text-sm font-medium leading-6 text-gray-900">
            Müşteri Türü
          </label>
          <div className="mt-2">
            <select
              id="customerType"
              name="customerType"
              value={data.customerType}
              onChange={(e) => onFieldChange('customerType', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Seçiniz</option>
              <option value="corporate">Tüzel Müşteri</option>
              <option value="individual">Bireysel Müşteri</option>
              <option value="foreign">Yabancı Müşteri</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="accountNumber" className="block text-sm font-medium leading-6 text-gray-900">
            Cari Hesap Numarası
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="accountNumber"
              id="accountNumber"
              value={data.accountNumber}
              onChange={(e) => onFieldChange('accountNumber', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="referenceNumber" className="block text-sm font-medium leading-6 text-gray-900">
            Referans Numarası
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="referenceNumber"
              id="referenceNumber"
              value={data.referenceNumber}
              disabled
              className="block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Otomatik oluşturulacak"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="reference" className="block text-sm font-medium leading-6 text-gray-900">
            Referans
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="reference"
              id="reference"
              value={data.reference}
              onChange={(e) => onFieldChange('referenceNumber', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="operationYear" className="block text-sm font-medium leading-6 text-gray-900">
            İşlem Tarihi
          </label>
          <div className="mt-2">
            <select
              id="operationYear"
              name="operationYear"
              value={data.operationYear}
              onChange={(e) => onFieldChange('operationYear', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Seçiniz</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
