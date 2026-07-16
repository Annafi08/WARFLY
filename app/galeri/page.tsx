"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type FotoGaleri = {
  id: number;
  device_id: string;
  tanggal_kunjungan: string;
  foto_url: string;
  created_at: string;
};

function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("warfly-device-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("warfly-device-id", id);
  }
  return id;
}

// Kompres & resize foto sebelum diupload, biar hemat storage
function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Gagal mengompres gambar"));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatBulan(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

export default function GaleriPage() {
  const [semuaFoto, setSemuaFoto] = useState<FotoGaleri[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [tanggalKunjungan, setTanggalKunjungan] = useState(
    new Date().toISOString().split("T")[0]
  );

  const deviceId = getDeviceId();

  const loadFoto = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("galeri")
      .select("*")
      .order("tanggal_kunjungan", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSemuaFoto(data);
    }
    setLoading(false);
  }, []);

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadFoto();
}, [loadFoto]);
  // Hitung berapa foto yang sudah diupload device ini untuk tanggal yang dipilih
  const jumlahHariIni = semuaFoto.filter(
    (f) => f.device_id === deviceId && f.tanggal_kunjungan === tanggalKunjungan
  ).length;

  const sisaSlot = 3 - jumlahHariIni;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setErrorMsg("");

    if (sisaSlot <= 0) {
      setErrorMsg("Kamu sudah mencapai batas 3 foto untuk tanggal ini.");
      return;
    }

    setUploading(true);

    try {
      const compressedBlob = await compressImage(file);

      const fileName = `${deviceId}-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("galeri-photos")
        .upload(fileName, compressedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("galeri-photos")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("galeri").insert({
        device_id: deviceId,
        tanggal_kunjungan: tanggalKunjungan,
        foto_url: publicUrlData.publicUrl,
      });

      if (insertError) throw insertError;

      await loadFoto();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setErrorMsg("Gagal upload: " + message);
    } finally {
      setUploading(false);
    }
  }

  // Kelompokkan foto berdasarkan bulan
  const fotoPerBulan: Record<string, FotoGaleri[]> = {};
  for (const foto of semuaFoto) {
    const label = formatBulan(foto.tanggal_kunjungan);
    if (!fotoPerBulan[label]) fotoPerBulan[label] = [];
    fotoPerBulan[label].push(foto);
  }

  return (
    <main className="pt-32 px-6 pb-16 min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-center mb-2">Gallery</h1>
      <p className="text-center text-gray-500 mb-10">
        Simpan kenangan kamu di WARFLY, maksimal 3 foto per tanggal kunjungan.
      </p>

      {/* Form upload */}
      <div className="max-w-3xl mx-auto mb-12 bg-purple-50/60 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal kunjungan kamu
            </label>
            <input
              type="date"
              value={tanggalKunjungan}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setTanggalKunjungan(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <p className="text-sm text-gray-500 sm:pb-2.5">
            {sisaSlot > 0
              ? `${sisaSlot} slot foto tersisa untuk tanggal ini`
              : "Batas 3 foto untuk tanggal ini sudah tercapai"}
          </p>
        </div>

        {sisaSlot > 0 && (
          <label className="flex items-center justify-center h-32 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer text-purple-500 hover:bg-purple-100/50 transition font-medium">
            {uploading ? "Mengupload..." : "+ Tambah Foto"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}

        {errorMsg && (
          <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>
        )}
      </div>

      {/* Galeri publik, dikelompokkan per bulan */}
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-400">Memuat galeri...</p>
        ) : semuaFoto.length === 0 ? (
          <p className="text-center text-gray-400">
            Belum ada foto. Jadilah yang pertama berbagi momen di WARFLY!
          </p>
        ) : (
          Object.entries(fotoPerBulan).map(([bulan, fotoList]) => (
            <div key={bulan} className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                {bulan}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {fotoList.map((foto) => (
                  <img
                    key={foto.id}
                    src={foto.foto_url}
                    alt="Kenangan di WARFLY"
                    className="rounded-xl w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
