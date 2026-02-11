import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api, asArray } from "../api";
import type { Article } from "../types";
import SmartImage from "../components/SmartImage";

function useQuery() {
  const loc = useLocation();
  return useMemo(() => new URLSearchParams(loc.search), [loc.search]);
}

export default function Articles() {
  const query = useQuery();
  const search = (query.get("search") || "").toLowerCase();

  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Article[]>("/public/articles");
        setItems(asArray<Article>(res.data));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return items;
    return items.filter((a) => {
      const t = (a.title || "").toLowerCase();
      const e = (a.excerpt || "").toLowerCase();
      return t.includes(search) || e.includes(search);
    });
  }, [items, search]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">artikel</div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                Opini & Edukasi Kopi
              </h1>
              <p className="text-slate-600 mt-2 text-sm">
                Tulisan komunitas tentang kopi, roasting, seduh, dan cerita di baliknya.
              </p>
              {search ? (
                <p className="text-sm mt-2 font-black text-emerald-700">
                  Hasil pencarian: “{search}”
                </p>
              ) : null}
            </div>
          </div>

          {loading ? (
            <div className="text-slate-500 mt-8">Memuat...</div>
          ) : (
            <div className="mt-6 divide-y divide-slate-200/70 border-t border-slate-200/70">
              {filtered.map((a) => (
                <Link
                  key={a.id}
                  to={`/articles/${a.slug}`}
                  className="group grid md:grid-cols-[200px_1fr] gap-5 py-5"
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
                      {a.excerpt || "Bacaan ringan seputar kopi dan komunitas."}
                    </div>
                    <div className="text-sm font-black text-slate-900">Baca →</div>
                  </div>
                </Link>
              ))}
              {!filtered.length ? (
                <div className="py-10 text-slate-500 font-semibold">Tidak ada artikel yang cocok.</div>
              ) : null}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white shadow-sm">
            <div className="p-4 border-b border-slate-200/70">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">kategori</div>
              <div className="font-black text-lg">Topik</div>
            </div>
            <div className="p-4 grid gap-2 text-sm font-black">
              {["Roasting", "Manual Brew", "Espresso", "Kopi Lokal", "Komunitas"].map((t) => (
                <Link
                  key={t}
                  to={`/articles?search=${encodeURIComponent(t)}`}
                  className="px-4 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-emerald-600 text-white shadow-sm">
            <div className="p-5">
              <div className="text-xs font-black uppercase tracking-widest text-white/80">kontribusi</div>
              <div className="font-black text-lg mt-1">Kirim Tulisan</div>
              <p className="text-white/90 text-sm mt-2">
                Punya opini kopi atau cerita komunitas? Kirim ide via WhatsApp.
              </p>
              <a
                href="https://wa.me/628XXXXXXXXXX"
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-4 px-4 py-2 rounded-2xl bg-white text-emerald-700 font-black text-sm"
              >
                Hubungi Admin
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
