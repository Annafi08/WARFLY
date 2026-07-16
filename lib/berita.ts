import { supabase } from "@/lib/supabase";

export type BeritaItem = {
  id: number;
  tag: string;
  title: string;
  deskripsi: string;
  tanggal: string;
};

const TAG_COLOR: Record<string, string> = {
  Promo: "bg-pink-100 text-pink-600",
  Event: "bg-purple-100 text-purple-600",
  Diskon: "bg-amber-100 text-amber-600",
};

export function getTagColor(tag: string): string {
  return TAG_COLOR[tag] ?? "bg-gray-100 text-gray-600";
}

// Ambil semua berita, diurutkan berdasarkan id
export async function getAllBerita(): Promise<BeritaItem[]> {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data berita:", error.message);
    return [];
  }

  return data ?? [];
}