export default function Footer() {
  return (
    <footer className="bg-grey-600-grey200- border-t border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Logo */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              WARFLY
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              WARFLY adalah Warkop yang bervisualkan TK, sehingga
              anda dapat merasakan nongkrong santai bersama teman dengan sensasi yang unik
              seperti di TK
              </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Hubungi Kami
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>📧 warflygokil@gmail.com</p>
              <p>📱 +62 812-3456-7890</p>
              <p>📍 Jl. Cempaka Baru VII, no.7, 
                </p>
                <p>Cempaka Baru,Kemayoran,Jakarta Pusat</p>
            </div>
          </div>

        </div>

        <div className="border-t border-black-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WARFLY. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition">
              Instagram
            </a>

            <a href="#" className="text-gray-400 hover:text-purple-400 transition">
               Github
            </a>

            <a href="#" className="text-gray-400 hover:text-purple-400 transition">
              Discord
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}