"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: number;
  nama: string;
  harga: number;
  jumlah: number;
}

interface CartContextType {
  cart: CartItem[];
  tambahItem: (item: Omit<CartItem, "jumlah">) => void;
  kurangItem: (id: number) => void;
  kosongkanCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  // ===========================
  // Ambil cart dari localStorage
  // ===========================
  const [cart, setCart] = useState<CartItem[]>(() => {

    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("warfly-cart");

    return saved ? JSON.parse(saved) : [];
  });
  // ===========================
  // Simpan ke localStorage
  // ===========================
  useEffect(() => {
    localStorage.setItem(
      "warfly-cart",
      JSON.stringify(cart)
    );
  }, [cart]);
  // ===========================
  // Tambah Item
  // ===========================
  const tambahItem = (
    item: Omit<CartItem, "jumlah">
  ) => {

    setCart((prev) => {

      const ada = prev.find(
        (i) => i.id === item.id
      );

      if (ada) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                jumlah: i.jumlah + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          jumlah: 1,
        },
      ];
    });
  };
  // ===========================
  // Kurangi Item
  // ===========================
  const kurangItem = (id: number) => {

    setCart((prev) =>

      prev
        .map((i) =>
          i.id === id
            ? {
                ...i,
                jumlah: i.jumlah - 1,
              }
            : i
        )
        .filter((i) => i.jumlah > 0)

    );
  };
  // ===========================
  // Kosongkan Cart
  // ===========================
  const kosongkanCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tambahItem,
        kurangItem,
        kosongkanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart harus berada di dalam CartProvider"
    );
  }

  return context;
}