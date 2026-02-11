import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, waLink } from "../api";
import type { Article } from "../types";
import SmartImage from "../components/SmartImage";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!slug) return;
        const res = await api.get<Article>(`/public/articles/${slug}`);
        setItem(res.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const cover = useMemo(
    () =>
      item?.cover_image_url ||
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2400&q=80",
    [item]
  );

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12 text-slate-500">Memuat...</div>;
  if (!item) return <div className="max-w-5xl mx-auto px-4 py-12">Artikel tidak ditemukan.</div>;

  return (
    <div className="bg-transparent">
      {/* hero */}
      <section className="relative">
        <div className="h-[400px] md:h-[520px] w-full overflow-hidden">
          <SmartImage
            src={cover}
            fallbackSrc="/assets/brand/gambar6.jpeg"
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
          <div className="rounded-3xl bg-white border border-slate-200/70 shadow-sm p-6 md:p-8">
            <Link to="/articles" className="text-sm font-black text-emerald-700 hover:underline">
              ← Kembali ke Artikel
            </Link>

            <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {item.title}
            </h1>

            {item.excerpt ? (
              <p className="text-slate-600 mt-3 leading-relaxed">{item.excerpt}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waLink(`Halo Kebun Merdesa, saya baru baca artikel "${item.title}". Saya mau tanya soal kopi 😊`)}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-zinc-950 text-white font-black hover:bg-zinc-900"
              >
                Tanya via WhatsApp
              </a>
              <Link
                to="/menu"
                className="px-5 py-3 rounded-2xl border border-slate-200 font-black hover:bg-slate-50"
              >
                Lihat Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* content */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200/70 bg-white shadow-sm p-6 md:p-8">
              <div className="text-xs font-black uppercase tracking-widest text-emerald-700">
                Kolom Kopi
              </div>

              <div className="mt-6 text-[15px] md:text-[16px] leading-[1.9] text-slate-800">
                {(item.content || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((p, idx) => (
                    <p key={idx} className="mb-5">
                      {p}
                    </p>
                  ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-slate-200/70 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-200/70">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">aksi cepat</div>
                <div className="font-black text-lg">Butuh Rekomendasi?</div>
              </div>
              <div className="p-4 space-y-3">
                <a
                  href={waLink("Halo Kebun Merdesa, saya mau rekomendasi kopi untuk pemula 😊")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700"
                >
                  Rekomendasi Kopi
                </a>
                <a
                  href={waLink("Halo Kebun Merdesa, saya mau booking tempat untuk diskusi/kerja 😊")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-zinc-950 text-white font-black hover:bg-zinc-900"
                >
                  Booking Space
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-emerald-600 text-white shadow-sm">
              <div className="p-5">
                <div className="text-xs font-black uppercase tracking-widest text-white/80">tips</div>
                <div className="font-black text-lg mt-1">Biar makin nikmat</div>
                <p className="text-white/90 text-sm mt-2">
                  Coba mulai dari ratio 1:15, giling medium, dan pakai air bersih. Nanti kita bantu seting!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

