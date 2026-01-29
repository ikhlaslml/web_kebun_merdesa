import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api, formatIdr, waLink } from "../api";
import type { Article, Product } from "../types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const mapsUrl = import.meta.env.VITE_MAPS_URL || "https://g.co/kgs/ttHN2G";

  useEffect(() => {
    (async () => {
      try {
        const p = await api.get<Product[]>("/public/products");
        setProducts(p.data || []);
        const a = await api.get<Article[]>("/public/articles");
        setArticles(a.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const hero = useMemo(() => articles?.[0], [articles]);
  const heroCover =
    hero?.cover_image_url ||
    "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=2400&q=80";

  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);
  const latestArticles = useMemo(() => articles.slice(0, 8), [articles]);

  const todayItems = [
    { label: "Promo", title: "Diskon manual brew 10% (Hari Ini)", meta: "Mulai 10.00" },
    { label: "Kelas", title: "Mini cupping: kenali rasa & aroma", meta: "Sore 16.00" },
    { label: "Komunitas", title: "Ngobrol kopi: roasting & brew ratio", meta: "Malam 19.30" },
    { label: "Rilis", title: "Artikel baru: dasar espresso untuk pemula", meta: "Terbit hari ini" },
  ];

  return (
    <div className="bg-white">
      {/* HERO (mirip Historia) */}
      <section className="relative">
        <div className="h-[52vh] md:h-[62vh] w-full overflow-hidden">
          <img src={heroCover} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/10" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_-140px_140px_rgba(0,0,0,0.55)]" />
        </div>

        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-10">
            <div className="max-w-2xl text-white space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black">
                Kebun Merdesa • Open Daily 09.00–23.00 🌿
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {hero?.title || "Ruang Komunitas Kopi: Ngopi, Belajar, Berkolaborasi"}
              </h1>

              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {hero?.excerpt ||
                  "Tempat untuk roasting, seduh, diskusi, dan pengembangan masyarakat—dilengkapi artikel/opini kopi yang mudah dipahami."}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={waLink("Halo Kebun Merdesa, saya mau tanya menu & pemesanan 😊")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm"
                >
                  Pesan via WhatsApp
                </a>

                {hero?.slug ? (
                  <Link
                    to={`/articles/${hero.slug}`}
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-sm"
                  >
                    Baca Artikel Utama
                  </Link>
                ) : (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-sm"
                  >
                    Lihat Lokasi
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TODAY BAR */}
        <div className="bg-white border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <div className="shrink-0">
              <div className="text-xs font-black uppercase tracking-widest text-emerald-700">hari ini</div>
              <div className="text-sm font-black text-slate-900">Kebun Merdesa</div>
            </div>

            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-6 min-w-max pr-2">
                {todayItems.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <div className="leading-tight">
                      <div className="text-xs font-black text-slate-900">
                        <span className="text-emerald-700">{t.label}</span> — {t.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold">{t.meta}</div>
                    </div>
                    <div className="h-8 w-px bg-slate-200/70 ml-2" />
                  </div>
                ))}
              </div>
            </div>

            <Link to="/articles" className="shrink-0 text-sm font-black text-emerald-700 hover:underline">
              Lainnya →
            </Link>
          </div>
        </div>
      </section>

      {/* KANAL GRID */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* left tiles */}
          <div className="lg:col-span-3 grid gap-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-white shadow-sm">
              <div className="p-4 bg-zinc-950 text-white">
                <div className="text-xs font-black uppercase tracking-widest text-white/70">kolom</div>
                <div className="font-black text-lg">Opini Kopi</div>
              </div>
              <div className="p-4 text-sm text-slate-600 leading-relaxed">
                Tulisan pendek tentang roasting, seduh, dan budaya kopi—bahasannya ringan.
                <Link to="/articles" className="block mt-3 font-black text-emerald-700 hover:underline">
                  Selengkapnya →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-emerald-600 text-white shadow-sm">
              <div className="p-5">
                <div className="text-xs font-black uppercase tracking-widest text-white/80">kelas</div>
                <div className="font-black text-lg mt-1">Belajar Brew Bareng</div>
                <p className="text-white/90 text-sm mt-2">
                  Dari basic ratio sampai tasting notes. Bisa booking via WhatsApp.
                </p>
                <a
                  href={waLink("Halo Kebun Merdesa, saya mau ikut kelas brew/ cupping 😊")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-4 px-4 py-2 rounded-2xl bg-white text-emerald-700 font-black text-sm"
                >
                  Booking
                </a>
              </div>
            </div>
          </div>

          {/* center feature */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-white shadow-sm">
              <div className="relative aspect-[16/9] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2400&q=80"
                  alt="Feature"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black">
                    Kebun Merdesa • Feature
                  </div>
                  <div className="text-xl md:text-2xl font-black leading-tight">
                    Dari Kebun ke Cangkir: Kopi, Komunitas, dan Cerita
                  </div>
                  <div className="text-sm text-white/80">
                    Mempertemukan kopi lokal dengan ruang belajar & kolaborasi.
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-wrap gap-3 items-center justify-between">
                <div className="text-sm text-slate-600">
                  Mau kolaborasi event komunitas atau workshop?
                </div>
                <div className="flex gap-2">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-2xl border border-slate-200 font-black text-sm hover:bg-slate-50"
                  >
                    Lokasi
                  </a>
                  <a
                    href={waLink("Halo Kebun Merdesa, saya mau kolaborasi event/ workshop 😊")}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-2xl bg-zinc-950 text-white font-black text-sm hover:bg-zinc-900"
                  >
                    Kolaborasi
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right promo */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-200/70">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">highlight</div>
                <div className="font-black text-lg">Menu Favorit</div>
              </div>

              <div className="p-4 space-y-3">
                {featuredProducts.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/70">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1 leading-tight">
                      <div className="font-black text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-500 font-semibold">{p.category || "Menu"}</div>
                      <div className="text-sm font-black text-emerald-700 mt-1">{formatIdr(p.price || 0)}</div>
                    </div>
                  </div>
                ))}

                <Link
                  to="/menu"
                  className="inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-emerald-600 text-white font-black text-sm hover:bg-emerald-700"
                >
                  Lihat Semua Produk →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIST ARTIKEL + SIDEBAR (mirip Historia) */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left list */}
          <div className="lg:col-span-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">artikel</div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                  Opini & Edukasi Kopi
                </h2>
              </div>
              <Link to="/articles" className="text-sm font-black text-emerald-700 hover:underline">
                Lihat semua →
              </Link>
            </div>

            <div className="mt-6 divide-y divide-slate-200/70 border-t border-slate-200/70">
              {latestArticles.map((a) => (
                <Link
                  key={a.id}
                  to={`/articles/${a.slug}`}
                  className="group grid md:grid-cols-[180px_1fr] gap-5 py-5"
                >
                  <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 aspect-[16/10]">
                    {a.cover_image_url ? (
                      <img src={a.cover_image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase tracking-widest text-emerald-700">
                      Kolom Kopi
                    </div>
                    <div className="text-lg md:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {a.title}
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      {a.excerpt || "Bacaan ringan seputar kopi, roasting, seduh, dan budaya komunitas."}
                    </div>
                    <div className="text-sm font-black text-slate-900">Baca →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-slate-200/70 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-200/70">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">ikuti kami</div>
                <div className="font-black text-lg">Komunitas</div>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <a className="block font-black text-emerald-700 hover:underline" href="#">
                  Instagram • @kebunmerdesa
                </a>
                <a className="block font-black text-slate-900 hover:underline" href="#">
                  TikTok • kebunmerdesa
                </a>
                <a
                  href={waLink("Halo Kebun Merdesa, saya mau tanya event/komunitas 😊")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-zinc-950 text-white font-black hover:bg-zinc-900"
                >
                  Gabung via WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-200/70">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">terpopuler</div>
                <div className="font-black text-lg">Paling Dibaca</div>
              </div>
              <div className="p-4 space-y-3">
                {latestArticles.slice(0, 5).map((a, i) => (
                  <Link key={a.id} to={`/articles/${a.slug}`} className="flex gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/70 grid place-items-center font-black text-slate-700">
                      {i + 1}
                    </div>
                    <div className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition">
                      {a.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-emerald-600 text-white shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="text-xs font-black uppercase tracking-widest text-white/80">lokasi</div>
                <div className="font-black text-lg mt-1">Kunjungi Kebun Merdesa</div>
                <p className="text-white/90 text-sm mt-2">
                  Nongkrong, kerja, diskusi, atau belajar kopi bareng.
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-4 px-4 py-2 rounded-2xl bg-white text-emerald-700 font-black text-sm"
                >
                  Buka Google Maps
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CHANNEL SECTION (mirip Historia bawah gelap) */}
      <section className="bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-300">channel</div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                Video & Kegiatan Komunitas
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-black text-white/80 hover:text-white hover:underline"
            >
              Lainnya →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Ngobrol Kopi: Basic Espresso", tag: "Talk", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80" },
              { title: "Cupping Session: Kenali Notes", tag: "Workshop", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80" },
              { title: "Roasting Journey: Dari Green Bean", tag: "Behind the Scene", img: "https://images.unsplash.com/photo-1523942839745-7848d9f18e3c?auto=format&fit=crop&w=1200&q=80" },
            ].map((v, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                <div className="aspect-[16/9] relative">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black">
                      {v.tag}
                    </div>
                    <div className="font-black text-lg leading-snug">{v.title}</div>
                  </div>
                </div>
                <div className="p-4">
                  <a
                    href={waLink(`Halo Kebun Merdesa, saya mau info kegiatan: ${v.title} 😊`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-sm"
                  >
                    Tanya Jadwal
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
