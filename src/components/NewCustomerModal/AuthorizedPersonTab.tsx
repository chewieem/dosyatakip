interface AuthorizedPerson {
  id: string;
  identityNumber: string;
  firstName: string;
  lastName: string;
  motherName: string;
  fatherName: string;
  birthDate: string;
  birthPlace: string;
}

interface AuthorizedPersonTabProps {
  data: {
    authorizedPersons: AuthorizedPerson[];
  };
  onChange: (field: string, value: any) => void;
}

import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function AuthorizedPersonTab({ data, onChange }: AuthorizedPersonTabProps) {
  const addNewPerson = () => {
    const newPerson: AuthorizedPerson = {
      id: Date.now().toString(),
      identityNumber: '',
      firstName: '',
      lastName: '',
      motherName: '',
      fatherName: '',
      birthDate: '',
      birthPlace: ''
    };
    
    onChange('authorizedPersons', [...data.authorizedPersons, newPerson]);
  };

  const updatePerson = (personId: string, field: string, value: string) => {
    const updatedPersons = data.authorizedPersons.map(person => {
      if (person.id === personId) {
        return { ...person, [field]: value };
      }
      return person;
    });
    onChange('authorizedPersons', updatedPersons);
  };

  const removePerson = (personId: string) => {
    const updatedPersons = data.authorizedPersons.filter(person => person.id !== personId);
    onChange('authorizedPersons', updatedPersons);
  };
  return (
    <div className="space-y-6 py-6">
      {data.authorizedPersons.map((person, index) => (
        <div key={person.id} className="relative border rounded-lg p-4 mb-4">
          {index > 0 && (
            <button
              type="button"
              onClick={() => removePerson(person.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="identityNumber" className="block text-sm font-medium leading-6 text-gray-900">
            Kimlik Numarası
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="identityNumber"
              id="identityNumber"
              value={person.identityNumber}
              onChange={(e) => updatePerson(person.id, 'identityNumber', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
            Ad
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={person.firstName}
              onChange={(e) => updatePerson(person.id, 'firstName', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
            Soyad
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={person.lastName}
              onChange={(e) => updatePerson(person.id, 'lastName', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="motherName" className="block text-sm font-medium leading-6 text-gray-900">
            Anne Adı
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="motherName"
              id="motherName"
              value={person.motherName}
              onChange={(e) => updatePerson(person.id, 'motherName', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="fatherName" className="block text-sm font-medium leading-6 text-gray-900">
            Baba Adı
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="fatherName"
              id="fatherName"
              value={person.fatherName}
              onChange={(e) => updatePerson(person.id, 'fatherName', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">
            Doğum Tarihi
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={person.birthDate}
              onChange={(e) => updatePerson(person.id, 'birthDate', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="birthPlace" className="block text-sm font-medium leading-6 text-gray-900">
            Doğum Yeri
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="birthPlace"
              id="birthPlace"
              value={person.birthPlace}
              onChange={(e) => updatePerson(person.id, 'birthPlace', e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addNewPerson}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Yeni Kişi Ekle
        </button>
      </div>
    </div>
  );
}
