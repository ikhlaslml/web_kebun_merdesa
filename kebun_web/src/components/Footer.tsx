export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <div className="font-black text-xl tracking-tight">
            Kebun<span className="text-emerald-400">Merdesa</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Coffee roaster & collaborative space. Ruang belajar, diskusi, dan pengembangan komunitas—plus
            artikel/opini kopi untuk memperkaya wawasan.
          </p>
          <div className="text-xs text-white/60 font-bold">
            Open Daily • 09.00–23.00 🌿
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-white/70">Navigasi</div>
          <div className="grid gap-2 text-sm font-semibold text-white/80">
            <a className="hover:text-emerald-300" href="/">Beranda</a>
            <a className="hover:text-emerald-300" href="/menu">Produk</a>
            <a className="hover:text-emerald-300" href="/articles">Artikel</a>
            <a className="hover:text-emerald-300" href="/about">Tentang</a>
            <a className="hover:text-emerald-300" href="/contact">Kontak</a>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-white/70">Kontak</div>
          <div className="text-sm text-white/80 space-y-2">
            <div>WhatsApp: 62xxxxxxx</div>
            <div>Instagram: @kebunmerdesa</div>
            <div>Alamat: (isi sesuai lokasi)</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-white/70">Catatan</div>
          <p className="text-white/70 text-sm leading-relaxed">
            Website local-first React + Laravel. Siap dikembangkan untuk deploy.  
            Jika butuh halaman “premium/subscribe”, tinggal tambah route baru.
          </p>
          <a
            href="https://wa.me/628XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="inline-flex px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-black text-sm"
          >
            Pesan via WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Kebun Merdesa
      </div>
    </footer>
  );
}
