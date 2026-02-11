import { useEffect, useMemo, useState } from "react";
import { api, asArray, formatIdr, waLink } from "../api";
import type { Product } from "../types";
import SmartImage from "../components/SmartImage";

export default function Menu() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Product[]>("/public/products");
        setItems(asArray<Product>(res.data));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of items) {
      const k = p.category || "Menu";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(p);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500">produk</div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Menu Kebun Merdesa
          </h1>
          <p className="text-slate-600 mt-2 text-sm">Klik produk untuk pesan langsung via WhatsApp.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-500 mt-8">Memuat...</div>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(([cat, list]) => (
            <div key={cat}>
              <div className="flex items-center justify-between gap-3">
                <div className="font-black text-xl text-slate-900">{cat}</div>
                <div className="text-xs font-black uppercase tracking-widest text-emerald-700">
                  {list.length} item
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {list.map((p) => (
                  <div key={p.id} className="rounded-3xl border border-slate-200/70 bg-white shadow-sm overflow-hidden">
                    <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200/70">
                      <SmartImage
                        src={p.image_url}
                        fallbackSrc="/assets/brand/gambar6.jpeg"
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <div className="text-xs font-black uppercase tracking-widest text-slate-500">{cat}</div>
                      <div className="font-black text-lg text-slate-900 mt-1">{p.name}</div>
                      <div className="font-black text-emerald-700 mt-2">{formatIdr(p.price || 0)}</div>
                      {p.description ? (
                        <div className="text-sm text-slate-600 mt-2 leading-relaxed">{p.description}</div>
                      ) : null}

                      <a
                        href={waLink(
                          `Halo Kebun Merdesa, saya mau pesan:\n- ${p.name}\nHarga: ${formatIdr(
                            p.price || 0
                          )}\n\nBoleh dibantu ya 😊`
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-2xl bg-zinc-950 text-white font-black hover:bg-zinc-900"
                      >
                        Pesan via WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!items.length ? <div className="text-slate-500">Belum ada produk.</div> : null}
        </div>
      )}
    </section>
  );
}
