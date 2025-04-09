'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { tr } from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DashboardNavbar from '../../../components/DashboardNavbar';

const locales = {
  'tr': tr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Örnek etkinlikler
const events = [
  {
    title: 'ABC Teknoloji - Vergi Levhası Son Tarih',
    start: new Date(2025, 3, 12), // Ay 0'dan başlar (Nisan = 3)
    end: new Date(2025, 3, 12),
    allDay: true,
    type: 'expiry'
  },
  {
    title: 'XYZ Yazılım - Yıllık Değerlendirme',
    start: new Date(2025, 3, 15, 10, 0), // 15 Nisan 2025 10:00
    end: new Date(2025, 3, 15, 11, 30),  // 15 Nisan 2025 11:30
    type: 'meeting'
  },
  {
    title: 'Ahmet Yılmaz - İmza Sirküleri Son Tarih',
    start: new Date(2025, 3, 20),
    end: new Date(2025, 3, 20),
    allDay: true,
    type: 'expiry'
  },
];

const messages = {
  allDay: 'Tüm gün',
  previous: 'Önceki',
  next: 'Sonraki',
  today: 'Bugün',
  month: 'Ay',
  week: 'Hafta',
  day: 'Gün',
  agenda: 'Ajanda',
  date: 'Tarih',
  time: 'Saat',
  event: 'Etkinlik',
  noEventsInRange: 'Bu aralıkta etkinlik bulunmuyor.',
  showMore: (total: number) => `+${total} daha fazla`,
};

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

function EventDetailModal({ isOpen, onClose, event }: EventDetailModalProps) {
  if (!event) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Etkinlik Detayları
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Başlık</h4>
                    <p className="mt-1 text-sm text-gray-900">{event.title}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tür</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {event.type === 'expiry' ? 'Evrak Son Tarihi' : 
                       event.type === 'meeting' ? 'Toplantı' : 'Diğer'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Başlangıç</h4>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(event.start)}</p>
                  </div>

                  {!event.allDay && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Bitiş</h4>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(event.end)}</p>
                    </div>
                  )}

                  {event.type === 'expiry' && (
                    <div className="rounded-md bg-yellow-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Son Tarih Uyarısı
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              Bu evrakın geçerlilik süresi dolmak üzere. Lütfen gerekli yenileme işlemlerini yapın.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function CalendarPage() {
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Etkinlik stilini özelleştirme
  const eventStyleGetter = (event: any) => {
    let style = {
      backgroundColor: '#3B82F6', // Varsayılan mavi
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
      display: 'block',
    };

    if (event.type === 'expiry') {
      style.backgroundColor = '#DC2626'; // Kırmızı
    } else if (event.type === 'meeting') {
      style.backgroundColor = '#059669'; // Yeşil
    }

    return {
      style,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="p-6 lg:p-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Takvim</h2>
              <button
                onClick={() => {/* Yeni etkinlik ekleme modalını aç */}}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Yeni Etkinlik
              </button>
            </div>

            {/* Renk açıklamaları */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                <span className="text-sm text-gray-600">Evrak Son Tarihi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600"></div>
                <span className="text-sm text-gray-600">Toplantı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-600"></div>
                <span className="text-sm text-gray-600">Diğer</span>
              </div>
            </div>

            <div className="h-[700px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                view={view as any}
                onView={(newView) => setView(newView)}
                popup
                selectable
                onSelectSlot={(slotInfo) => {
                  // Yeni etkinlik ekleme modalını aç
                  console.log('Seçilen zaman aralığı:', slotInfo);
                }}
                onSelectEvent={(event) => {
                  setSelectedEvent(event);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <EventDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
