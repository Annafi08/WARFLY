"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type MenuItem = {
  id: number;
  nama: string;
  harga: number;
  kategori: string;
  badge: string | null;
  foto_url: string | null;
};

const KATEGORI_OPTIONS = ["Kopi", "Minuman", "Makanan"];

export default function AdminMenuPage() {
  const supabase = createClient();

  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState(KATEGORI_OPTIONS[0]);
  const [badge, setBadge] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function loadMenu() {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setMenuList(data);
    }
    setLoading(false);
  }

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadMenu();
}, []);

  function bukaModalTambah() {
    setEditingId(null);
    setNama("");
    setHarga("");
    setKategori(KATEGORI_OPTIONS[0]);
    setBadge("");
    setFotoUrl("");
    setErrorMsg("");
    setShowModal(true);
  }

  function bukaModalEdit(item: MenuItem) {
    setEditingId(item.id);
    setNama(item.nama);
    setHarga(String(item.harga));
    setKategori(item.kategori);
    setBadge(item.badge ?? "");
    setFotoUrl(item.foto_url ?? "");
    setErrorMsg("");
    setShowModal(true);
  }

  async function handleSimpan(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!nama.trim() || !harga.trim()) {
      setErrorMsg("Nama dan harga wajib diisi.");
      return;
    }

    setSaving(true);

    const payload = {
      nama: nama.trim(),
      harga: Number(harga),
      kategori,
      badge: badge.trim() === "" ? null : badge.trim(),
      foto_url: fotoUrl.trim() === "" ? null : fotoUrl.trim(),
    };

    let error;
    if (editingId) {
      const res = await supabase.from("menu").update(payload).eq("id", editingId);
      error = res.error;
    } else {
      const res = await supabase.from("menu").insert(payload);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      setErrorMsg("Gagal menyimpan: " + error.message);
      return;
    }

    setShowModal(false);
    loadMenu();
  }

  async function handleHapus(id: number) {
    const konfirmasi = confirm("Yakin mau hapus menu ini?");
    if (!konfirmasi) return;

    const { error } = await supabase.from("menu").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }
    loadMenu();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-6 pt-32 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="text-sm text-purple-500 font-medium hover:underline"
            >
              ← Kembali ke Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
              Kelola Menu
            </h1>
          </div>

          <button
            onClick={bukaModalTambah}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            + Tambah Menu
          </button>
        </div>

        {/* List Menu */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="text-center text-gray-500 py-12">Memuat data...</p>
          ) : menuList.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Belum ada menu.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-purple-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-3">Foto</th>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Harga</th>
                  <th className="px-6 py-3">Kategori</th>
                  <th className="px-6 py-3">Badge</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {menuList.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-6 py-3">
                      {item.foto_url ? (
                        <img
                          src={item.foto_url}
                          alt={item.nama}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          No foto
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{item.kategori}</td>
                    <td className="px-6 py-3">
                      {item.badge && (
                        <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button
                        onClick={() => bukaModalEdit(item)}
                        className="text-purple-600 hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleHapus(item.id)}
                        className="text-red-500 hover:underline text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Menu" : "Tambah Menu"}
            </h2>

            <form onSubmit={handleSimpan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Menu
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Kopi Susu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga (angka saja)
                </label>
                <input
                  type="number"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="7000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {KATEGORI_OPTIONS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Badge (opsional)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Best Seller / Favorit (kosongkan jika tidak ada)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto (opsional)
                </label>
                <input
                  type="text"
                  value={fotoUrl}
                  onChange={(e) => setFotoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="https://... (dari Supabase Storage)"
                />
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-purple-500 text-white font-semibold py-2.5 rounded-xl hover:bg-purple-600 transition disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
