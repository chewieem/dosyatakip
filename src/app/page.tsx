import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-600 via-blue-500 to-white">
        {/* Dekoratif arka plan öğeleri */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Geometrik şekiller */}
          <div className="absolute top-20 right-0 w-72 h-72 -rotate-12">
            <div className="absolute inset-0 border-2 border-blue-300 rounded-3xl transform rotate-45"></div>
            <div className="absolute inset-4 border-2 border-blue-200 rounded-3xl transform rotate-45"></div>
            <div className="absolute inset-8 border-2 border-blue-100 rounded-3xl transform rotate-45"></div>
          </div>
          <div className="absolute -top-20 -left-20 w-72 h-72 rotate-12">
            <div className="absolute inset-0 border-2 border-blue-300 rounded-3xl"></div>
            <div className="absolute inset-4 border-2 border-blue-200 rounded-3xl"></div>
            <div className="absolute inset-8 border-2 border-blue-100 rounded-3xl"></div>
          </div>
          {/* Çizgiler */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          {/* Noktalar */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-blue-200/50"></div>
          <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full bg-blue-100/30"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-blue-100/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="relative">
              <h1 className="relative text-4xl font-bold tracking-tight text-white sm:text-6xl">
                İşletmenizi Profesyonel Çözümlerle Dönüştürün
              </h1>
            </div>
          </div>
          <p className="text-lg leading-8 text-blue-100 max-w-2xl mx-auto mb-12 relative z-10">
            Günümüzün rekabetçi pazarında işletmelerin büyümesine, uyum sağlamasına ve başarılı olmasına yardımcı olan yenilikçi kurumsal hizmetler sunuyoruz.
          </p>
          <div className="flex justify-center gap-x-6 relative z-10">
            <a
              href="/login"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              UYUM360 Giriş
            </a>
            <a
              href="/#services"
              className="rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 transition-colors duration-200"
            >
              Daha Fazla Bilgi
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-blue-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hizmetlerimiz</h2>
            <p className="mt-4 text-lg text-gray-600">İşletmeniz için kapsamlı çözümler</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'İş Danışmanlığı',
                description: 'İşletmenizin başarıya ulaşması için stratejik rehberlik ve uzman tavsiyesi.',
                icon: '🎯'
              },
              {
                title: 'Dijital Dönüşüm',
                description: 'İşletmenizi en son dijital çözümlerle modernleştirin.',
                icon: '💻'
              },
              {
                title: 'Finansal Hizmetler',
                description: 'Profesyonel finansal planlama ve yönetim hizmetleri.',
                icon: '📊'
              },
              {
                title: 'Pazar Analizi',
                description: 'Detaylı pazar araştırmaları ve rekabet analizi.',
                icon: '📈'
              },
              {
                title: 'Risk Yönetimi',
                description: 'Kapsamlı risk değerlendirmesi ve azaltma stratejileri.',
                icon: '🛡️'
              },
              {
                title: 'Süreç Optimizasyonu',
                description: 'Operasyonları düzenleyin ve verimliliği artırın.',
                icon: '⚡'
              }
            ].map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="py-24 px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">Sektör Liderlerinin Tercihi</h2>
            <p className="mt-4 text-lg text-gray-600">İşletmelerini bizimle dönüştüren şirketler</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'ABC Teknoloji',
                image: '/images/referans.jpg',
                description: 'Kurumsal yazılım çözümleri ve dijital dönüşüm projesi',
                year: '2024'
              },
              {
                name: 'XYZ Holding',
                image: '/images/referans.jpg',
                description: 'Finans yönetim sistemi entegrasyonu',
                year: '2024'
              },
              {
                name: 'Tech Solutions',
                image: '/images/referans.jpg',
                description: 'Bulut altyapı modernizasyonu',
                year: '2023'
              }
            ].map((referans, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={referans.image}
                    alt={referans.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{referans.name}</h3>
                <p className="text-gray-600 mb-3">{referans.description}</p>
                <p className="text-sm text-gray-500">{referans.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-blue-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">İletişime Geçin</h2>
              <p className="text-lg text-gray-600 mb-8">
                İşletmenizi dönüştürmeye hazır mısınız? Danışmanlık için bugün bize ulaşın.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">📍</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Adres</h3>
                    <p className="text-gray-600">İş Merkezi Caddesi No:123, Kat:1, İstanbul, Türkiye</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">📧</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@nextbyte.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">📱</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Telefon</h3>
                    <p className="text-gray-600">+90 (123) 456-7890</p>
                  </div>
                </div>
              </div>
            </div>
            <form className="mt-12 max-w-xl mx-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="relative">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    placeholder="Ad"
                    autoComplete="given-name"
                    className="peer block w-full rounded-lg border border-blue-100 bg-blue-50/30 px-4 py-3 text-gray-700 placeholder-transparent shadow-sm outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="first-name"
                    className="absolute -top-2.5 left-2 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Ad
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    placeholder="Soyad"
                    autoComplete="family-name"
                    className="peer block w-full rounded-lg border border-blue-100 bg-blue-50/30 px-4 py-3 text-gray-700 placeholder-transparent shadow-sm outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="last-name"
                    className="absolute -top-2.5 left-2 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Soyad
                  </label>
                </div>
                <div className="relative sm:col-span-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="email"
                    className="peer block w-full rounded-lg border border-blue-100 bg-blue-50/30 px-4 py-3 text-gray-700 placeholder-transparent shadow-sm outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="email"
                    className="absolute -top-2.5 left-2 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Email
                  </label>
                </div>
                <div className="relative sm:col-span-2">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Mesaj"
                    className="peer block w-full rounded-lg border border-blue-100 bg-blue-50/30 px-4 py-3 text-gray-700 placeholder-transparent shadow-sm outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="message"
                    className="absolute -top-2.5 left-2 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Mesaj
                  </label>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/images/nextbyte.png"
              alt="Nextbyte Logo"
              width={240}
              height={50}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gray-400">Yenilikçi teknoloji çözümleri sunan profesyonel kurumsal hizmetler.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><a href="/#services" className="text-gray-400 hover:text-white">Hizmetler</a></li>
              <li><a href="/#about" className="text-gray-400 hover:text-white">Hakkımızda</a></li>
              <li><a href="/#references" className="text-gray-400 hover:text-white">Referanslar</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-2">
              <li><a href="/#" className="text-gray-400 hover:text-white">İş Danışmanlığı</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Dijital Dönüşüm</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Finansal Hizmetler</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Risk Yönetimi</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
            <ul className="space-y-2">
              <li><a href="/#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Nextbyte. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
