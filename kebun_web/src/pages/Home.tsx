import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api, asArray, formatIdr, waLink } from "../api";
import type { Article, Product, Channel } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import SmartImage from "../components/SmartImage";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeBanner, setActiveBanner] = useState(0);
  const mapsUrl = import.meta.env.VITE_MAPS_URL || "https://g.co/kgs/ttHN2G";

  useEffect(() => {
    (async () => {
      try {
        const p = await api.get<Product[]>("/public/products");
        setProducts(asArray<Product>(p.data));
        const a = await api.get<Article[]>("/public/articles");
        setArticles(asArray<Article>(a.data));
        const c = await api.get<Channel[]>("/public/channels");
        setChannels(asArray<Channel>(c.data));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const heroCoverFallback =
    "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=2400&q=80";

  const heroBanners = useMemo(
    () =>
      articles.length
        ? articles
        : [
            {
              id: 0,
              title: "Ruang Komunitas Kopi: Ngopi, Belajar, Berkolaborasi",
              excerpt:
                "Tempat untuk roasting, seduh, diskusi, dan pengembangan masyarakat - dilengkapi artikel kopi yang mudah dipahami.",
              slug: "",
              cover_image_url: heroCoverFallback,
            } as Article,
          ],
    [articles]
  );

  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);
  const latestArticles = useMemo(() => articles.slice(0, 8), [articles]);
  const channelItems = useMemo(() => {
    if (channels.length) return channels.slice(0, 3);

    return latestArticles.slice(0, 3).map((a, idx) => ({
      id: -(idx + 1),
      title: a.title,
      tag: "Artikel",
      image_url: a.cover_image_url,
      cta_label: "Tanya Jadwal",
      whatsapp_message: `Halo Kebun Merdesa, saya mau info kegiatan: ${a.title}`,
      is_active: true,
    })) as Channel[];
  }, [channels, latestArticles]);

  useEffect(() => {
    setActiveBanner(0);
  }, [heroBanners.length]);

  return (
    <div className="bg-transparent">
      {/* HERO CAROUSEL (artikel menjadi banner) */}
      <section className="relative">
        <div className="h-[400px] md:h-[520px] w-full overflow-hidden relative">
          <Swiper
            className="hero-swiper h-full"
            modules={[Autoplay, EffectFade, Pagination, Navigation]}
            effect="fade"
            speed={800}
            loop={heroBanners.length > 1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".hero-prev",
              nextEl: ".hero-next",
            }}
            onSlideChange={(swiper) => setActiveBanner(swiper.realIndex)}
          >
            {heroBanners.map((b, idx) => {
              const title = b.title || "Ruang Komunitas Kopi: Ngopi, Belajar, Berkolaborasi";
              const description =
                b.excerpt ||
                "Tempat untuk roasting, seduh, diskusi, dan pengembangan masyarakat - dilengkapi artikel kopi yang mudah dipahami.";
              const link = b.slug ? `/articles/${b.slug}` : mapsUrl;
              const isExternal = !b.slug;

              return (
                <SwiperSlide key={b.id || idx}>
                  <div className="relative h-full w-full">
                    <SmartImage
                      src={b.cover_image_url || heroCoverFallback}
                      fallbackSrc="/assets/brand/gambar6.jpeg"
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/10" />
                    <div className="absolute inset-0 flex items-center">
                      <div className="max-w-4xl mx-auto px-5 text-center text-white">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black transition-all duration-700 ${
                            idx === activeBanner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          Kebun Merdesa - Open Daily 09.00-23.00
                        </div>

                        <h1
                          className={`mt-4 text-3xl md:text-5xl font-black tracking-tight leading-tight transition-all duration-700 delay-100 ${
                            idx === activeBanner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          {title}
                        </h1>

                        <p
                          className={`mt-3 text-white/85 text-sm md:text-base leading-relaxed transition-all duration-700 delay-200 ${
                            idx === activeBanner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          {description}
                        </p>

                        <div
                          className={`mt-6 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-300 ${
                            idx === activeBanner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          {isExternal ? (
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm"
                            >
                              Lihat Lokasi
                            </a>
                          ) : (
                            <Link
                              to={link}
                              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm"
                            >
                              Baca Artikel
                            </Link>
                          )}
                          <a
                            href={waLink("Halo Kebun Merdesa, saya mau tanya menu & pemesanan")}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-black text-sm"
                          >
                            Pesan via WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            type="button"
            aria-label="Sebelumnya"
            className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white font-black hover:bg-white/20"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Berikutnya"
            className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white font-black hover:bg-white/20"
          >
            ›
          </button>
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
                Tulisan pendek tentang roasting, seduh, dan budaya kopi - bahasannya ringan.
                <Link to="/articles" className="block mt-3 font-black text-emerald-700 hover:underline">
                  Selengkapnya &rarr;
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
                  href={waLink("Halo Kebun Merdesa, saya mau ikut kelas brew/ cupping")}
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
                  src="/assets/brand/gambar6.jpeg"
                  alt="Feature"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black">
                    Kebun Merdesa - Feature
                  </div>
                  <div className="text-xl md:text-2xl font-black leading-tight">
                    Dari Kebun ke Cangkir: Kopi, Komunitas, dan Cerita
                  </div>
                  <div className="text-sm text-white/80">
                    Mempertemukan kopi lokal dengan ruang belajar dan kolaborasi.
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
                    href={waLink("Halo Kebun Merdesa, saya mau kolaborasi event/ workshop")}
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
                      <SmartImage
                        src={p.image_url}
                        fallbackSrc="/assets/brand/gambar6.jpeg"
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
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
                  Lihat Semua Produk &rarr;
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
                Lihat semua &rarr;
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
                    <SmartImage
                      src={a.cover_image_url}
                      fallbackSrc="/assets/brand/gambar6.jpeg"
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                      loading="lazy"
                    />
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
                    <div className="text-sm font-black text-slate-900">Baca &rarr;</div>
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
                  Instagram - @kebunmerdesa
                </a>
                <a className="block font-black text-slate-900 hover:underline" href="#">
                  TikTok - kebunmerdesa
                </a>
                <a
                  href={waLink("Halo Kebun Merdesa, saya mau tanya event/komunitas")}
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
              Lainnya &rarr;
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {channelItems.map((v) => (
              <div key={v.id} className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                <div className="aspect-[16/9] relative">
                  <SmartImage
                    src={v.image_url}
                    fallbackSrc="/assets/brand/gambar6.jpeg"
                    alt={v.title}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-black">
                      {v.tag || "Channel"}
                    </div>
                    <div className="font-black text-lg leading-snug">{v.title}</div>
                  </div>
                </div>
                <div className="p-4">
                  <a
                    href={waLink(v.whatsapp_message || `Halo Kebun Merdesa, saya mau info kegiatan: ${v.title}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-sm"
                  >
                    {v.cta_label || "Tanya Jadwal"}
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











