"use client";

import Link from "next/link";
import { useCart } from "@/Context/CartContext";

export default function CartSidebar() {
  const { cart } = useCart();

  const totalHarga = cart.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const totalItem = cart.reduce(
    (total, item) => total + item.jumlah,
    0
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-28">

      <h2 className="text-2xl font-bold mb-5">
        🛒 Pesanan Kamu
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Belum ada menu dipilih.
        </p>
      ) : (
        <>
          <div className="space-y-3">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.nama} x{item.jumlah}
                </span>

                <span>
                  Rp{" "}
                  {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </span>
              </div>
            ))}

          </div>

          <hr className="my-5" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total ({totalItem})</span>

            <span>
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </div>

          <Link href="/reservasi">
            <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700">
              Lanjut Reservasi
            </button>
          </Link>
        </>
      )}

    </div>
  );
}