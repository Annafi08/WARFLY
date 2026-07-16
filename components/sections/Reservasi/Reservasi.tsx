"use client";

import { useState } from "react";

export default function Reservasi() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    tanggal: "",
    jam: "",
    jumlahOrang: "",
    catatan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: sambungkan ke API / WhatsApp / database reservasi di sini
    console.log("Data reservasi:", form);
    alert(`Terima kasih ${form.nama}! Reservasi kamu sudah kami terima.`);
    setForm({
      nama: "",
      telepon: "",
      tanggal: "",
      jam: "",
      jumlahOrang: "",
      catatan: "",
    });
  };

  return (
    <section
      id="reservasi"
      className="scroll-mt-20 py-20 px-6 md:px-12 bg-purple-50/40"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Booking Meja
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Reservasi Sekarang
          </h2>
          <p className="text-gray-600">
            Amankan tempat duduk favoritmu sebelum penuh.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                required
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama kamu"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon
              </label>
              <input
                type="tel"
                name="telepon"
                required
                value={form.telepon}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                required
                value={form.tanggal}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam
              </label>
              <input
                type="time"
                name="jam"
                required
                value={form.jam}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Orang
              </label>
              <input
                type="number"
                name="jumlahOrang"
                min={1}
                required
                value={form.jumlahOrang}
                onChange={handleChange}
                placeholder="Contoh: 4"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catatan (opsional)
              </label>
              <textarea
                name="catatan"
                rows={3}
                value={form.catatan}
                onChange={handleChange}
                placeholder="Ada permintaan khusus?"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-full transition"
          >
            Kirim Reservasi
          </button>
        </form>
      </div>
    </section>
  );
}
