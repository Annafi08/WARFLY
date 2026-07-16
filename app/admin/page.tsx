import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-6 pt-32 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Dashboard Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Masuk sebagai {user?.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-white border border-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              Lihat Sebagai User
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/menu"
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg p-6 transition-all duration-300 block"
          >
            <div className="text-4xl mb-3">☕</div>
            <h2 className="text-xl font-bold text-gray-900">Kelola Menu</h2>
            <p className="text-gray-500 text-sm mt-1">
              Tambah, edit, atau hapus menu WARFLY.
            </p>
          </Link>

          <Link
            href="/admin/berita"
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg p-6 transition-all duration-300 block"
          >
            <div className="text-4xl mb-3">📰</div>
            <h2 className="text-xl font-bold text-gray-900">Kelola Berita</h2>
            <p className="text-gray-500 text-sm mt-1">
              Tambah, edit, atau hapus berita & promo.
            </p>
          </Link>

          <Link
            href="/admin/pesanan"
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg p-6 transition-all duration-300 block"
          >
            <div className="text-4xl mb-3">🧾</div>
            <h2 className="text-xl font-bold text-gray-900">Kelola Pesanan</h2>
            <p className="text-gray-500 text-sm mt-1">
              Lihat pesanan masuk & ubah status pesanan.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}