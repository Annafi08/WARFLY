"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type ItemPesanan = {
  id: number;
  nama: string;
  harga: number;
  jumlah: number;
};

type Pesanan = {
  id: number;
  nama: string;
  telepon: string;
  tanggal: string;
  jam: string;
  jumlah_orang: number;
  catatan: string | null;
  metode_bayar: string;
  items: ItemPesanan[];
  total_harga: number;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = ["Baru", "Diproses", "Selesai", "Dibatalkan"];

const STATUS_COLOR: Record<string, string> = {
  Baru: "bg-blue-100 text-blue-600",
  Diproses: "bg-amber-100 text-amber-600",
  Selesai: "bg-green-100 text-green-600",
  Dibatalkan: "bg-red-100 text-red-600",
};

const METODE_LABEL: Record<string, string> = {
  qris: "QRIS",
  transfer: "Transfer Bank",
  cod: "Bayar di Tempat",
};

export default function AdminPesananPage() {
  const supabase = createClient();

  const [pesananList, setPesananList] = useState<Pesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailId, setDetailId] = useState<number | null>(null);

  async function loadPesanan() {
    setLoading(true);
    const { data, error } = await supabase
      .from("pesanan")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPesananList(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPesanan();
  }, []);

  async function handleUbahStatus(id: number, statusBaru: string) {
    const { error } = await supabase
      .from("pesanan")
      .update({ status: statusBaru })
      .eq("id", id);

    if (error) {
      alert("Gagal mengubah status: " + error.message);
      return;
    }

    loadPesanan();
  }

  const pesananDetail = pesananList.find((p) => p.id === detailId);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 px-6 pt-32 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm text-purple-500 font-medium hover:underline"
          >
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
            Kelola Pesanan
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="text-center text-gray-500 py-12">Memuat data...</p>
          ) : pesananList.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Belum ada pesanan masuk.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-purple-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Tanggal & Jam</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Metode</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pesananList.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {p.nama}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {p.tanggal} • {p.jam}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      Rp {p.total_harga.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {METODE_LABEL[p.metode_bayar] ?? p.metode_bayar}
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={p.status}
                        onChange={(e) =>
                          handleUbahStatus(p.id, e.target.value)
                        }
                        className={`text-xs font-semibold px-2 py-1.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          STATUS_COLOR[p.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => setDetailId(p.id)}
                        className="text-purple-600 hover:underline text-sm font-medium"
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Detail Pesanan */}
      {pesananDetail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Detail Pesanan
            </h2>

            <div className="space-y-2 text-gray-700 mb-6">
              <p><span className="font-medium">Nama:</span> {pesananDetail.nama}</p>
              <p><span className="font-medium">Telepon:</span> {pesananDetail.telepon}</p>
              <p><span className="font-medium">Tanggal:</span> {pesananDetail.tanggal}</p>
              <p><span className="font-medium">Jam:</span> {pesananDetail.jam}</p>
              <p><span className="font-medium">Jumlah Orang:</span> {pesananDetail.jumlah_orang}</p>
              {pesananDetail.catatan && (
                <p><span className="font-medium">Catatan:</span> {pesananDetail.catatan}</p>
              )}
              <p>
                <span className="font-medium">Metode Bayar:</span>{" "}
                {METODE_LABEL[pesananDetail.metode_bayar] ?? pesananDetail.metode_bayar}
              </p>
            </div>

            <h3 className="font-bold text-gray-900 mb-3">Item Pesanan</h3>
            <div className="space-y-2 mb-4">
              {pesananDetail.items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <span>{item.nama} x{item.jumlah}</span>
                  <span>Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>Rp {pesananDetail.total_harga.toLocaleString("id-ID")}</span>
            </div>

            <button
              onClick={() => setDetailId(null)}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-200 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
