import Link from "next/link";
import { getMenuFavorit, getIconByKategori } from "@/lib/menu";

export default async function MenuFavorit() {
  const menuFavorit = await getMenuFavorit();

  return (
    <section id="menu" className="scroll-mt-20 py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Menu Andalan
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Menu Favorit
          </h2>
          <p className="text-gray-600">
            Pilihan yang paling banyak dicari pelanggan WARFLY.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menuFavorit.map((item) => (
            <div
              key={item.id}
              className="relative bg-purple-50/60 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-3 right-3 bg-pink-400 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                {item.badge}
              </span>
              <div className="text-5xl mb-4">
                {item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.nama}
                    className="w-16 h-16 object-cover rounded-xl mx-auto"
                  />
                ) : (
                  getIconByKategori(item.kategori)
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {item.nama}
              </h3>
              <p className="text-purple-500 font-bold">
                Rp {Math.round(item.harga / 1000)}K
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/menu">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition">
              Menu Lainnya
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
