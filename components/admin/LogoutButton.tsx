"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-50 text-red-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-red-100 transition"
    >
      Keluar
    </button>
  );
}