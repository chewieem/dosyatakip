interface CompanyInfoTabProps {
  data: {
    companyName: string;
    occupation: string;
    taxNumber: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function CompanyInfoTab({ data, onChange }: CompanyInfoTabProps) {
  return (
    <div className="space-y-6 py-6">
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
            Şirket Adı
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={data.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="occupation" className="block text-sm font-medium leading-6 text-gray-900">
            Meslek
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={data.occupation}
              onChange={(e) => onChange('occupation', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="taxNumber" className="block text-sm font-medium leading-6 text-gray-900">
            Vergi Numarası
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="taxNumber"
              id="taxNumber"
              value={data.taxNumber}
              onChange={(e) => onChange('taxNumber', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
