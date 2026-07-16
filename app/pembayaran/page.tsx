"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import { supabase } from "@/lib/supabase";

interface DataReservasi {
  nama: string;
  telepon: string;
  tanggal: string;
  jam: string;
  jumlahOrang: string;
  catatan: string;
}

export default function PembayaranPage() {
  const router = useRouter();
  const { cart, kosongkanCart } = useCart();

  const [dataReservasi] = useState<DataReservasi | null>(() => {
    if (typeof window === "undefined") return null;

    const simpanan = sessionStorage.getItem("dataReservasi");
    return simpanan ? JSON.parse(simpanan) : null;
  });
  const [sudahBayar, setSudahBayar] = useState(false);
  const [metodeBayar, setMetodeBayar] = useState("qris");
  const [menyimpan, setMenyimpan] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalHarga = cart.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const totalItem = cart.reduce((total, item) => total + item.jumlah, 0);

  async function handleBayar() {
    if (!dataReservasi) {
      setErrorMsg("Data reservasi tidak ditemukan. Silakan ulangi dari awal.");
      return;
    }

    setErrorMsg("");
    setMenyimpan(true);

    const { error } = await supabase.from("pesanan").insert({
      nama: dataReservasi.nama,
      telepon: dataReservasi.telepon,
      tanggal: dataReservasi.tanggal,
      jam: dataReservasi.jam,
      jumlah_orang: Number(dataReservasi.jumlahOrang),
      catatan: dataReservasi.catatan || null,
      metode_bayar: metodeBayar,
      items: cart,
      total_harga: totalHarga,
    });

    setMenyimpan(false);

    if (error) {
      setErrorMsg("Gagal menyimpan pesanan: " + error.message);
      return;
    }

    kosongkanCart();
    sessionStorage.removeItem("dataReservasi");
    setSudahBayar(true);
  }

  // Kalau belum sukses bayar, tapi cart kosong & belum ada data reservasi
  // artinya user langsung buka /pembayaran tanpa lewat menu & reservasi dulu
  if (!sudahBayar && cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-32 pb-16 px-6 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-3">Belum Ada Pesanan</h1>
          <p className="text-gray-600 mb-6">
            Kamu belum memilih menu apapun. Yuk pilih menu favoritmu dulu.
          </p>
          <button
            onClick={() => router.push("/menu")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Lihat Menu
          </button>
        </div>
      </main>
    );
  }

  // Tampilan sukses setelah bayar
  if (sudahBayar) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-32 pb-16 px-6 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-3">Pembayaran Berhasil!</h1>
          <p className="text-gray-600 mb-6">
            Terima kasih{dataReservasi?.nama ? `, ${dataReservasi.nama}` : ""}!
            Reservasi dan pesananmu sudah kami terima. Sampai jumpa di WARFLY.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-32 pb-16 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Detail Pembayaran */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <span className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
              Pembayaran
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Selesaikan Pembayaran
            </h1>
            <p className="text-gray-600">
              Cek kembali detail reservasi dan pesananmu sebelum membayar.
            </p>
          </div>

          {dataReservasi && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <h2 className="text-xl font-bold mb-4">Detail Reservasi</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-medium">Nama:</span>{" "}
                  {dataReservasi.nama}
                </p>
                <p>
                  <span className="font-medium">Telepon:</span>{" "}
                  {dataReservasi.telepon}
                </p>
                <p>
                  <span className="font-medium">Tanggal:</span>{" "}
                  {dataReservasi.tanggal}
                </p>
                <p>
                  <span className="font-medium">Jam:</span>{" "}
                  {dataReservasi.jam}
                </p>
                <p>
                  <span className="font-medium">Jumlah Orang:</span>{" "}
                  {dataReservasi.jumlahOrang}
                </p>
                {dataReservasi.catatan && (
                  <p className="sm:col-span-2">
                    <span className="font-medium">Catatan:</span>{" "}
                    {dataReservasi.catatan}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-xl font-bold mb-4">Metode Pembayaran</h2>

            <div className="space-y-3">
              {[
                { id: "qris", label: "QRIS" },
                { id: "transfer", label: "Transfer Bank" },
                { id: "cod", label: "Bayar di Tempat" },
              ].map((metode) => (
                <label
                  key={metode.id}
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${
                    metodeBayar === metode.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="metode"
                    value={metode.id}
                    checked={metodeBayar === metode.id}
                    onChange={(e) => setMetodeBayar(e.target.value)}
                  />
                  {metode.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Ringkasan Pesanan */}
        <div>
          <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-32">
            <h2 className="text-2xl font-bold mb-5">🛒 Pesanan Kamu</h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.nama} x{item.jumlah}
                  </span>
                  <span>
                    Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-5" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total ({totalItem})</span>
              <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
            )}

            <button
              onClick={handleBayar}
              disabled={menyimpan}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition disabled:opacity-50"
            >
              {menyimpan ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
