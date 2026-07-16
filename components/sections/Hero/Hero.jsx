export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-top relative overflow-hidden"
    >
      {/* Background dengan efek zoom pelan */}
      <div
        className="absolute inset-0 bg-cover bg-top hero-bg-animate"
        style={{ backgroundImage: "url('/warfly.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      {/* Sparkle mengambang */}
      {/* Sparkle mengambang */}
<div className="hero-sparkle w-2 h-2 left-[5%] bottom-0" style={{ animationDelay: "0s" }}></div>
<div className="hero-sparkle w-1.5 h-1.5 left-[12%] bottom-0" style={{ animationDelay: "2.6s" }}></div>
<div className="hero-sparkle w-3 h-3 left-[20%] bottom-0" style={{ animationDelay: "1.2s" }}></div>
<div className="hero-sparkle w-2 h-2 left-[30%] bottom-0" style={{ animationDelay: "4s" }}></div>
<div className="hero-sparkle w-2.5 h-2.5 left-[38%] bottom-0" style={{ animationDelay: "0.5s" }}></div>
<div className="hero-sparkle w-1.5 h-1.5 left-[46%] bottom-0" style={{ animationDelay: "3.2s" }}></div>
<div className="hero-sparkle w-2 h-2 left-[54%] bottom-0" style={{ animationDelay: "1.8s" }}></div>
<div className="hero-sparkle w-3 h-3 left-[62%] bottom-0" style={{ animationDelay: "0.2s" }}></div>
<div className="hero-sparkle w-2 h-2 left-[70%] bottom-0" style={{ animationDelay: "3.8s" }}></div>
<div className="hero-sparkle w-2.5 h-2.5 left-[78%] bottom-0" style={{ animationDelay: "1.4s" }}></div>
<div className="hero-sparkle w-1.5 h-1.5 left-[85%] bottom-0" style={{ animationDelay: "2.2s" }}></div>
<div className="hero-sparkle w-2 h-2 left-[90%] bottom-0" style={{ animationDelay: "0.9s" }}></div>
<div className="hero-sparkle w-2.5 h-2.5 left-[95%] bottom-0" style={{ animationDelay: "3.5s" }}></div>
<div className="hero-sparkle w-1.5 h-1.5 left-[98%] bottom-0" style={{ animationDelay: "2s" }}></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">

        <span
          className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full mb-4 hero-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          ☕ Warkop dengan Vibes Beda
        </span>

        <h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 hero-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Selamat Datang di{" "}
          <span className="text-purple-400 hero-neon-text">WARFLY</span>
        </h1>

        <p
          className="text-gray-100 text-lg mb-8 max-w-md mx-auto hero-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Nongkrong santai bareng teman dengan sensasi unik seperti di TK.
          Kopi enak, suasana asik, kenangan masa kecil.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center hero-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#reservasi"
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(244,114,182,0.7)]"
          >
            Reservasi Sekarang
          </a>

          <a
            href="#menu"
            className="border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            Lihat Menu
          </a>
        </div>
      </div>
    </section>
  );
}
