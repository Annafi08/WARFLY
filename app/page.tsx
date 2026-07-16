export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero/Hero";
import Tentang from "@/components/sections/Tentang/Tentang";
import Berita from "@/components/sections/Berita/Berita";
import MenuFavorit from "@/components/sections/MenuFavorit/MenuFavorit";
import Reservasi from "@/components/sections/Reservasi/Reservasi";

export default function Home() {
  return (
    <>
      <main className="pt-20">
        <Hero />
        <Tentang />
        <Berita />
        <MenuFavorit />
        <Reservasi />
      </main>
    </>
  );
}