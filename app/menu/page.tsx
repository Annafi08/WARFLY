import MenuCard from "@/components/sections/Menu2/MenuCard";
import CartSidebar from "@/components/sections/Menu2/CartSidebar";
import { getAllMenu, getIconByKategori } from "@/lib/menu";

export default async function MenuPage() {
  const semuaMenu = await getAllMenu();

  const kategoriList = ["Kopi", "Minuman", "Makanan"];
  const iconKategori: Record<string, string> = {
    Kopi: "☕",
    Minuman: "🥤",
    Makanan: "🍞",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-8">

        {/* Judul */}
        <section className="lg:col-span-4 text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
            Menu WARFLY
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 mt-5">
            Pilih Menu Favoritmu
          </h1>

          <p className="text-gray-600 mt-4">
            Pilih makanan dan minuman sebelum melakukan reservasi.
          </p>
        </section>

        {/* ===== KONTEN MENU (3 kolom) ===== */}
        <div className="lg:col-span-3 space-y-16">
          {kategoriList.map((kategori) => {
            const items = semuaMenu.filter((m) => m.kategori === kategori);

            if (items.length === 0) return null;

            return (
              <section key={kategori}>
                <h2 className="text-3xl font-bold mb-6">
                  {iconKategori[kategori]} {kategori}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <MenuCard
                      key={item.id}
                      id={item.id}
                      nama={item.nama}
                      harga={item.harga}
                      icon={item.foto_url || getIconByKategori(item.kategori)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ===== SIDEBAR KERANJANG (1 kolom, sticky) ===== */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32">
            <CartSidebar />
          </div>
        </aside>

      </div>
    </main>
  );
}
