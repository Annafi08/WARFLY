"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type BeritaItem = {
  id: number;
  tag: string;
  title: string;
  deskripsi: string;
  tanggal: string;
};

const TAG_OPTIONS = ["Promo", "Event", "Diskon"];

const TAG_COLOR: Record<string, string> = {
  Promo: "bg-pink-100 text-pink-600",
  Event: "bg-purple-100 text-purple-600",
  Diskon: "bg-amber-100 text-amber-600",
};

export default function AdminBeritaPage() {
  const supabase = createClient();

  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [tag, setTag] = useState(TAG_OPTIONS[0]);
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function loadBerita() {
    setLoading(true);
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setBeritaList(data);
    }
    setLoading(false);
  }

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadBerita();
}, []);

  function bukaModalTambah() {
    setEditingId(null);
    setTag(TAG_OPTIONS[0]);
    setTitle("");
    setDeskripsi("");
    setTanggal("");
    setErrorMsg("");
    setShowModal(true);
  }

  function bukaModalEdit(item: BeritaItem) {
    setEditingId(item.id);
    setTag(item.tag);
    setTitle(item.title);
    setDeskripsi(item.deskripsi);
    setTanggal(item.tanggal);
    setErrorMsg("");
    setShowModal(true);
  }

  async function handleSimpan(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim() || !deskripsi.trim() || !tanggal.trim()) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }

    setSaving(true);

    const payload = {
      tag,
      title: title.trim(),
      deskripsi: deskripsi.trim(),
      tanggal: tanggal.trim(),
    };

    let error;
    if (editingId) {
      const res = await supabase.from("berita").update(payload).eq("id", editingId);
      error = res.error;
    } else {
      const res = await supabase.from("berita").insert(payload);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      setErrorMsg("Gagal menyimpan: " + error.message);
      return;
    }

    setShowModal(false);
    loadBerita();
  }

  async function handleHapus(id: number) {
    const konfirmasi = confirm("Yakin mau hapus berita ini?");
    if (!konfirmasi) return;

    const { error } = await supabase.from("berita").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }
    loadBerita();
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
              Kelola Berita
            </h1>
          </div>

          <button
            onClick={bukaModalTambah}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            + Tambah Berita
          </button>
        </div>

        {/* List Berita */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="text-center text-gray-500 py-12">Memuat data...</p>
          ) : beritaList.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Belum ada berita.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-purple-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-3">Tag</th>
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-6 py-3">Tanggal</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {beritaList.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          TAG_COLOR[item.tag] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {item.tanggal}
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
              {editingId ? "Edit Berita" : "Tambah Berita"}
            </h2>

            <form onSubmit={handleSimpan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {TAG_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Diskon 20% Semua Menu Kopi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Khusus hari Senin-Rabu, nikmati diskon..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal / Periode
                </label>
                <input
                  type="text"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="1 - 31 Juli 2026 atau Setiap Jumat"
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
