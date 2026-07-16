export const dynamic = "force-dynamic";

import { getAllBerita, getTagColor } from "@/lib/berita";

export default async function BeritaPage() {
  const berita = await getAllBerita();

  return (
    <main className="min-h-screen bg-purple-50/40 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Update Terkini
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Semua Berita, Event & Promo
          </h1>
          <p className="text-gray-600">
            Jangan sampai ketinggalan info promo dan acara seru di WARFLY.
          </p>
        </div>

        {berita.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada berita.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {berita.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
              >
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${getTagColor(
                    item.tag
                  )}`}
                >
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.deskripsi}</p>
                <p className="text-xs text-gray-400 font-medium">
                  {item.tanggal}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}