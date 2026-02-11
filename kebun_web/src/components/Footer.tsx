export default function Footer() {
  return (
    <footer className="mt-12 px-3 pb-3 md:px-4 md:pb-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[24px] border border-emerald-900/20 bg-emerald-900/88 text-white shadow-[0_18px_45px_rgba(5,46,22,0.35)]">
        <div className="grid gap-8 px-5 py-10 md:grid-cols-4 md:px-7">
          <div className="space-y-4">
            <img
              src="/assets/brand/teks_kebunmerdesa.png"
              alt="Kebun Merdesa"
              className="h-8 object-contain"
            />
            <p className="text-sm leading-relaxed text-white/78">
              Coffee roaster and collaborative space untuk belajar, diskusi, dan pengembangan komunitas.
            </p>
            <div className="text-xs text-white/72">Open Daily - 09.00-23.00</div>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.16em] uppercase text-emerald-100/75">Navigasi</div>
            <div className="grid gap-2 text-sm text-white/85">
              <a className="hover:text-white" href="/">Beranda</a>
              <a className="hover:text-white" href="/menu">Produk</a>
              <a className="hover:text-white" href="/articles">Artikel</a>
              <a className="hover:text-white" href="/about">Tentang</a>
              <a className="hover:text-white" href="/contact">Kontak</a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.16em] uppercase text-emerald-100/75">Kontak</div>
            <div className="space-y-2 text-sm text-white/82">
              <div>WhatsApp: 62xxxxxxx</div>
              <div>Instagram: @kebunmerdesa</div>
              <div>Jl. Carang Pulang, Cikarawang, Dramaga, Kabupaten Bogor</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs tracking-[0.16em] uppercase text-emerald-100/75">Aksi Cepat</div>
            <p className="text-sm leading-relaxed text-white/78">
              Untuk pemesanan dan pertanyaan menu, langsung hubungi admin lewat WhatsApp.
            </p>
            <a
              href="https://wa.me/628XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center px-4 rounded-[18px] bg-white text-emerald-950 text-sm hover:bg-emerald-50"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/14 px-5 py-4 text-xs text-white/65 md:px-7">
          © {new Date().getFullYear()} Kebun Merdesa
        </div>
      </div>
    </footer>
  );
}
