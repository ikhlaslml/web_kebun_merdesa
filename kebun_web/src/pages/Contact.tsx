import { waLink } from "../api";

export default function Contact() {
  const mapsUrl = import.meta.env.VITE_MAPS_URL || "https://g.co/kgs/ttHN2G";

  return (
    <div className="bg-white">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-dark text-xs font-black uppercase tracking-widest">Kontak</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2 text-dark">
          Hubungi <span className="text-primary">Kebun Merdesa</span>
        </h1>
        <p className="text-slate-600 mt-3">
          Untuk pemesanan, pertanyaan menu, atau kolaborasi—langsung chat WhatsApp.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-[2rem] border border-slate-200/70 bg-white shadow-sm space-y-4">
            <div>
              <div className="text-[11px] text-slate-500 font-black uppercase tracking-widest">Jam Operasional</div>
              <div className="font-black text-dark mt-1">Open Daily • 09.00 AM – 11.00 PM 🌿</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 font-black uppercase tracking-widest">Layanan</div>
              <div className="font-semibold text-dark">Coffee Roaster & Collaborative Space</div>
              <div className="font-semibold text-dark">Agricultural Learning Center</div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={waLink("Halo Kebun Merdesa, saya mau tanya lokasi dan jam buka 😊")}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-primary text-white font-black hover:bg-primaryLight transition"
              >
                WhatsApp
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl border border-slate-200 text-dark font-black hover:bg-slate-50 transition"
              >
                Google Maps
              </a>
            </div>
          </div>

          <div className="p-6 rounded-[2rem] border border-slate-200/70 bg-primarySoft shadow-inner">
            <div className="text-[11px] text-slate-600 font-black uppercase tracking-widest">Catatan Dev</div>
            <div className="mt-2 font-black text-dark">Konfigurasi mudah</div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Kalau nanti production, base API & nomor WhatsApp bisa kamu atur dari <code className="font-bold">.env</code> frontend.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
