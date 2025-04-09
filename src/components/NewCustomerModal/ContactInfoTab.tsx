interface ContactInfoTabProps {
  data: {
    country: string;
    city: string;
    district: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

// Örnek veri, gerçek uygulamada API'den gelecek
const countries = ['Türkiye', 'Amerika Birleşik Devletleri', 'Almanya', 'İngiltere', 'Fransa'];
const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];
const districts = ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Maltepe'];

export default function ContactInfoTab({ data, onFieldChange }: ContactInfoTabProps) {
  return (
    <div className="space-y-6 py-6">
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            Ülke
          </label>
          <div className="mt-2">
            <select
              id="country"
              name="country"
              value={data.country}
              onChange={(e) => onFieldChange('country', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Seçiniz</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            Şehir
          </label>
          <div className="mt-2">
            <select
              id="city"
              name="city"
              value={data.city}
              onChange={(e) => onFieldChange('city', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Seçiniz</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
            İlçe
          </label>
          <div className="mt-2">
            <select
              id="district"
              name="district"
              value={data.district}
              onChange={(e) => onFieldChange('district', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Seçiniz</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Adres
          </label>
          <div className="mt-2">
            <textarea
              id="address"
              name="address"
              rows={3}
              value={data.address}
              onChange={(e) => onFieldChange('address', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
            Telefon
          </label>
          <div className="mt-2">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            E-posta
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
            Web Sitesi
          </label>
          <div className="mt-2">
            <input
              type="url"
              name="website"
              id="website"
              value={data.website}
              onChange={(e) => onFieldChange('website', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
