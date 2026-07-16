export default function Tentang() {
  const keunggulan = [
    {
      icon: "☕",
      title: "Kopi Berkualitas",
      desc: "Diseduh dari biji kopi pilihan dengan racikan pas di lidah.",
    },
    {
      icon: "🎨",
      title: "Vibes Unik",
      desc: "Suasana penuh warna yang bikin kamu bernostalgia ke masa TK.",
    },
    {
      icon: "🤝",
      title: "Tempat Nongkrong Asik",
      desc: "Ruang santai buat kumpul bareng teman kapan aja.",
    },
  ];

  const cardStyles = [
    "bg-gradient-to-br from-purple-600 to-violet-500 border-purple-400",
    "bg-gradient-to-br from-pink-500 to-fuchsia-500 border-pink-400",
    "bg-gradient-to-br from-fuchsia-600 to-purple-500 border-fuchsia-400",
  ];

  return (
    <section
      id="TentangKami"
      className="scroll-mt-20 py-24 px-6 md:px-12 bg-gradient-to-b from-purple-50/40 via-white to-white relative overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Gambar */}
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-tr from-purple-300 via-pink-200 to-transparent rounded-[2rem] opacity-60 blur-md -z-10"></div>

          <img
            src="/warfly.png"
            alt="Suasana WARFLY"
            className="rounded-3xl shadow-2xl w-full object-cover border-4 border-white"
          />

          <div className="absolute -bottom-7 -right-5 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-2xl px-7 py-5 shadow-xl hidden sm:block">
            <p className="text-3xl font-extrabold leading-none">100+</p>
            <p className="text-sm mt-1 text-purple-100">Pelanggan Setia</p>
          </div>
        </div>

        {/* Teks */}
        <div>
          <span className="inline-block bg-purple-100 text-purple-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
            Tentang Kami
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
            Kenalan Sama <span className="text-purple-600">WARFLY</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            WARFLY hadir sebagai warkop dengan vibes beda. Kami percaya
            nongkrong nggak cuma soal ngopi, tapi juga soal kenangan.
            Terinspirasi dari suasana ceria masa kecil, kami menghadirkan
            tempat yang bikin kamu betah berlama-lama bareng teman-teman.
          </p>

          <div className="space-y-5">
            {keunggulan.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-5 rounded-3xl border shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${cardStyles[index]}`}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl border border-white/20">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-white text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}