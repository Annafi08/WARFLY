"use client";

import { useCart } from "@/Context/CartContext";

type Props = {
  id: number;
  nama: string;
  harga: number;
  icon: string;
};

export default function MenuCard({
  id,
  nama,
  harga,
  icon,
}: Props) {
  const { cart, tambahItem, kurangItem } = useCart();

  const item = cart.find((i) => i.id === id);
  const jumlah = item ? item.jumlah : 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center">

      {/* Icon / Foto */}
<div className="mb-4">
  {icon.startsWith("http") ? (
    <img
      src={icon}
      alt={nama}
      className="w-24 h-24 object-cover rounded-2xl"
    />
  ) : (
    <div className="text-6xl">{icon}</div>
  )}
</div>

      {/* Nama */}
      <h3 className="text-xl font-bold text-center">
        {nama}
      </h3>

      {/* Harga */}
      <p className="text-pink-500 font-bold text-lg mt-2">
        Rp {harga.toLocaleString("id-ID")}
      </p>

      {/* Tombol */}
      <div className="flex items-center gap-5 mt-6">

        <button
          onClick={() => kurangItem(id)}
          className="w-10 h-10 rounded-full bg-pink-500 text-white text-xl hover:bg-pink-600 transition"
        >
          -
        </button>

        <span className="text-2xl font-bold w-8 text-center">
          {jumlah}
        </span>

        <button
          onClick={() =>
            tambahItem({
              id,
              nama,
              harga,
            })
          }
          className="w-10 h-10 rounded-full bg-purple-600 text-white text-xl hover:bg-purple-700 transition"
        >
          +
        </button>

      </div>

    </div>
  );
}