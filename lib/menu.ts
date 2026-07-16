import { supabase } from "@/lib/supabase";

export type MenuItem = {
  id: number;
  nama: string;
  harga: number;
  kategori: string;
  badge: string | null;
  foto_url: string | null;
};

// Ambil semua menu, diurutkan berdasarkan id
export async function getAllMenu(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil data menu:", error.message);
    return [];
  }

  return data ?? [];
}

// Ambil menu yang punya badge saja (buat section "Menu Favorit")
export async function getMenuFavorit(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .not("badge", "is", null)
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil menu favorit:", error.message);
    return [];
  }

  return data ?? [];
}

// Icon fallback selama foto belum tersedia, berdasarkan kategori
export function getIconByKategori(kategori: string): string {
  const iconMap: Record<string, string> = {
    Kopi: "☕",
    Minuman: "🥤",
    Makanan: "🍜",
  };
  return iconMap[kategori] ?? "🍽️";
}