'use client';

import { useState, Fragment } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { tr } from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import DashboardNavbar from '../../../components/DashboardNavbar';

const locales = {
  'tr': tr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'tr': tr,
  },
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

const eventStyleGetter = (event: any) => {
  return {
    className: event.type,
    style: {
      borderRadius: '4px',
    }
  };
};

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
  work_week: 'İş Haftası',
};

const formats = {
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'dd MMMM yyyy',
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'dd MMMM', { locale: tr })} - ${format(end, 'dd MMMM', { locale: tr })}`,
  agendaDateFormat: 'dd MMMM',
  agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'dd MMMM', { locale: tr })} - ${format(end, 'dd MMMM', { locale: tr })}`,
  weekdayFormat: 'cccc',
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

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
}

function NewEventModal({ isOpen, onClose, onSave }: NewEventModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('other');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const start = isAllDay 
      ? new Date(startDate)
      : new Date(startDate + 'T' + (startTime || '00:00'));

    const end = isAllDay
      ? new Date(endDate || startDate)
      : new Date((endDate || startDate) + 'T' + (endTime || startTime || '00:00'));

    const newEvent = {
      title,
      type,
      start,
      end,
      allDay: isAllDay
    };

    onSave(newEvent);
    onClose();
    
    // Form alanlarını temizle
    setTitle('');
    setType('other');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setIsAllDay(false);
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
                    Yeni Etkinlik Oluştur
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Başlık
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Tür
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="other">Diğer</option>
                      <option value="expiry">Evrak Son Tarihi</option>
                      <option value="meeting">Toplantı</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allDay"
                      checked={isAllDay}
                      onChange={(e) => setIsAllDay(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allDay" className="ml-2 block text-sm text-gray-900">
                      Tüm Gün
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Başlangıç Tarihi
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    {!isAllDay && (
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                          Başlangıç Saati
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        Bitiş Tarihi
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    {!isAllDay && (
                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                          Bitiş Saati
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Etkinlik Oluştur
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Etkinlik stilini özelleştirme
  const eventStyleGetter = (event: any) => {
    const baseStyle = {
      backgroundColor: '#22C55E', // Varsayılan yeşil
      color: 'white',
      border: '1px solid',
      borderColor: '#16A34A',
      borderRadius: '4px',
    };

    let finalStyle = { ...baseStyle };

    if (event.type === 'expiry') {
      finalStyle = {
        ...baseStyle,
        backgroundColor: '#DC2626',
        borderColor: '#B91C1C',
      };
    } else if (event.type === 'meeting') {
      finalStyle = {
        ...baseStyle,
        backgroundColor: '#2563EB',
        borderColor: '#1D4ED8',
      };
    }

    return {
      style: finalStyle,
      className: `calendar-event ${event.type}`
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />
      <main className="p-6 lg:p-8 mt-[64px]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Takvim</h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-600"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Evrak Son Tarihi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-600"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Toplantı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-600"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Diğer</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsNewEventModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Yeni Etkinlik
              </button>
            </div>

            <div className="h-[700px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                formats={formats}
                culture="tr"
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleEventSelect}
                style={{ height: 'calc(100vh - 200px)' }}
                view={view}
                onView={(newView: View) => setView(newView)}
                date={date}
                onNavigate={setDate}
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

      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSave={(event) => {
          console.log('New event:', event);
          setIsNewEventModalOpen(false);
        }}
      />
    </div>
  );
}
