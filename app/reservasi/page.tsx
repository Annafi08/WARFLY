"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";

export default function ReservasiPage() {
  const router = useRouter();
  const { cart } = useCart();

  // Tanggal hari ini
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    tanggal: "",
    jam: "",
    jumlahOrang: "",
    catatan: "",
  });

  const totalHarga = cart.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const totalItem = cart.reduce(
    (total, item) => total + item.jumlah,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      router.push("/menu");
      return;
    }

    sessionStorage.setItem(
      "dataReservasi",
      JSON.stringify(form)
    );

    router.push("/pembayaran");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-32 pb-16 px-6">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* ================= FORM ================= */}

        <div className="lg:col-span-2">

          <div className="mb-8">

            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              Reservasi WARFLY
            </span>

            <h1 className="text-4xl font-bold mt-5">
              Booking Meja
            </h1>

            <p className="text-gray-500 mt-3">
              Isi data reservasi terlebih dahulu sebelum melakukan pembayaran.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="font-semibold">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="nama"
                  required
                  value={form.nama}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-xl p-3"
                  placeholder="Masukkan nama"
                />
              </div>

              <div>
                <label className="font-semibold">
                  Nomor Telepon
                </label>

                <input
                  type="tel"
                  name="telepon"
                  required
                  value={form.telepon}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-xl p-3"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="font-semibold">
                  Tanggal Reservasi
                </label>

                <input
                  type="date"
                  name="tanggal"
                  required
                  min={today}
                  value={form.tanggal}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold">
                  Jam Reservasi
                </label>

                <input
                  type="time"
                  name="jam"
                  required
                  value={form.jam}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-xl p-3"
                />
              </div>

            </div>

            <div>

              <label className="font-semibold">
                Jumlah Orang
              </label>

              <input
                type="number"
                name="jumlahOrang"
                min={1}
                required
                value={form.jumlahOrang}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl p-3"
                placeholder="Contoh : 4"
              />

            </div>

            <div>

              <label className="font-semibold">
                Catatan
              </label>

              <textarea
                name="catatan"
                rows={4}
                value={form.catatan}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl p-3"
                placeholder="Permintaan khusus..."
              />

            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-4 rounded-xl font-bold"
            >
              Lanjut ke Pembayaran
            </button>

          </form>

        </div>

        {/* ================= RINGKASAN ================= */}

        <div>

          <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-32">

            <h2 className="text-2xl font-bold mb-6">
              🛒 Ringkasan Pesanan
            </h2>

            {cart.length === 0 ? (

              <p className="text-gray-500">
                Belum ada menu dipilih.
              </p>

            ) : (

              <>

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >

                      <div>

                        <h3 className="font-semibold">
                          {item.nama}
                        </h3>

                        <p className="text-sm text-gray-500">
                          x{item.jumlah}
                        </p>

                      </div>

                      <span className="font-bold text-pink-500">

                        Rp{" "}
                        {(item.harga * item.jumlah).toLocaleString(
                          "id-ID"
                        )}

                      </span>

                    </div>

                  ))}

                </div>

                <hr className="my-6" />

                <div className="flex justify-between text-lg font-bold">

                  <span>
                    Total ({totalItem})
                  </span>

                  <span className="text-purple-600">
                    Rp {totalHarga.toLocaleString("id-ID")}
                  </span>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}