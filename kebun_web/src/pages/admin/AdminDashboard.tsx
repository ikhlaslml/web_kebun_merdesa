import { useEffect, useMemo, useState } from "react";
import { api, formatIdr } from "../../api";
import type { Product, Article } from "../../types";
import { Link, useNavigate } from "react-router-dom";

function filePreview(file: File | null) {
  if (!file) return "";
  return URL.createObjectURL(file);
}

export default function AdminDashboard() {
  const nav = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // form product
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pPrice, setPPrice] = useState<number>(0);
  const [pDesc, setPDesc] = useState("");
  const [pImage, setPImage] = useState<File | null>(null);

  // form article
  const [aTitle, setATitle] = useState("");
  const [aExcerpt, setAExcerpt] = useState("");
  const [aContent, setAContent] = useState("");
  const [aCover, setACover] = useState<File | null>(null);

  const pPreview = useMemo(() => filePreview(pImage), [pImage]);
  const aPreview = useMemo(() => filePreview(aCover), [aCover]);

  const loadAll = async () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    if (!token) {
      nav("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const p = await api.get<Product[]>("/admin/products");
      setProducts(p.data || []);
      const a = await api.get<Article[]>("/admin/articles");
      setArticles(a.data || []);
    } catch (e: any) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("access_token");
        nav("/admin/login");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (pPreview) URL.revokeObjectURL(pPreview);
      if (aPreview) URL.revokeObjectURL(aPreview);
    };
  }, [pPreview, aPreview]);

  const logout = () => {
    localStorage.removeItem("access_token");
    nav("/");
  };

  const addProduct = async () => {
    const fd = new FormData();
    fd.append("name", pName);
    fd.append("category", pCategory);
    fd.append("price", String(pPrice || 0));
    fd.append("description", pDesc);
    if (pImage) fd.append("image", pImage);

    await api.post("/admin/products", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setPName("");
    setPCategory("");
    setPPrice(0);
    setPDesc("");
    setPImage(null);
    await loadAll();
  };

  const deleteProduct = async (id: number) => {
    await api.delete(`/admin/products/${id}`);
    await loadAll();
  };

  const addArticle = async () => {
    const fd = new FormData();
    fd.append("title", aTitle);
    fd.append("excerpt", aExcerpt);
    fd.append("content", aContent);
    if (aCover) fd.append("cover", aCover);

    await api.post("/admin/articles", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setATitle("");
    setAExcerpt("");
    setAContent("");
    setACover(null);
    await loadAll();
  };

  const deleteArticle = async (id: number) => {
    await api.delete(`/admin/articles/${id}`);
    await loadAll();
  };

  return (
    <div className="min-h-screen bg-primarySoft/40">
      <header className="bg-white/80 backdrop-blur border-b border-slate-200/70 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-white grid place-items-center font-black shadow-sm">
              KM
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-primary">Admin</div>
              <div className="font-black text-dark">Dashboard Kebun Merdesa</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-dark font-black hover:bg-slate-50 transition"
            >
              Lihat Website
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-dark text-white font-black hover:bg-dark/90 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-slate-600 text-sm">
          Kelola produk & artikel + upload gambar (maks 10MB). Pastikan backend sudah mengizinkan size upload.
        </p>

        {loading ? (
          <div className="text-slate-500 mt-8">Memuat...</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 mt-10">
            {/* PRODUCTS */}
            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-primary">Produk</div>
                  <h2 className="font-black text-xl text-dark">Tambah Produk</h2>
                </div>
                <div className="text-xs font-bold text-slate-500">{products.length} item</div>
              </div>

              <div className="grid gap-3 mt-5">
                <input
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  placeholder="Nama produk"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                />
                <input
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  placeholder="Kategori (misal: Kopi, Makanan, Merchandise)"
                  value={pCategory}
                  onChange={(e) => setPCategory(e.target.value)}
                />
                <input
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  placeholder="Harga (angka)"
                  type="number"
                  value={pPrice}
                  onChange={(e) => setPPrice(Number(e.target.value))}
                />
                <textarea
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary min-h-[110px]"
                  placeholder="Deskripsi"
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-3 items-start">
                  <div>
                    <label className="text-xs font-black text-slate-600 uppercase tracking-widest">
                      Gambar Produk
                    </label>
                    <input
                      className="mt-1 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPImage(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-slate-500 mt-2">Disarankan 1200px lebar, JPG/PNG.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200/70 bg-slate-50 overflow-hidden aspect-[16/10]">
                    {pPreview ? (
                      <img src={pPreview} alt="Preview Produk" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-slate-400 font-black">
                        Preview
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={addProduct}
                  className="px-4 py-3 rounded-2xl bg-primary text-white font-black hover:bg-primaryLight transition"
                >
                  Simpan Produk
                </button>
              </div>

              <div className="mt-8 space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/70 hover:shadow-sm transition"
                  >
                    <div>
                      <div className="font-black text-dark">{p.name}</div>
                      <div className="text-sm text-slate-600">
                        {p.category || "Menu"} • <span className="font-black text-coffee">{formatIdr(p.price || 0)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="px-3 py-2 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 transition"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ARTICLES */}
            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-dark">Artikel</div>
                  <h2 className="font-black text-xl text-dark">Tambah Artikel</h2>
                </div>
                <div className="text-xs font-bold text-slate-500">{articles.length} item</div>
              </div>

              <div className="grid gap-3 mt-5">
                <input
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  placeholder="Judul artikel"
                  value={aTitle}
                  onChange={(e) => setATitle(e.target.value)}
                />
                <input
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  placeholder="Excerpt (ringkasan)"
                  value={aExcerpt}
                  onChange={(e) => setAExcerpt(e.target.value)}
                />
                <textarea
                  className="px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary min-h-[160px]"
                  placeholder="Konten (pakai enter untuk paragraf)"
                  value={aContent}
                  onChange={(e) => setAContent(e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-3 items-start">
                  <div>
                    <label className="text-xs font-black text-slate-600 uppercase tracking-widest">
                      Cover Artikel
                    </label>
                    <input
                      className="mt-1 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setACover(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-slate-500 mt-2">Cover akan tampil di listing & detail artikel.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200/70 bg-slate-50 overflow-hidden aspect-[16/10]">
                    {aPreview ? (
                      <img src={aPreview} alt="Preview Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-slate-400 font-black">
                        Preview
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={addArticle}
                  className="px-4 py-3 rounded-2xl bg-dark text-white font-black hover:bg-dark/90 transition"
                >
                  Simpan Artikel
                </button>
              </div>

              <div className="mt-8 space-y-3">
                {articles.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/70 hover:shadow-sm transition"
                  >
                    <div>
                      <div className="font-black text-dark">{a.title}</div>
                      <div className="text-xs text-slate-500 font-semibold">{a.slug}</div>
                    </div>

                    <button
                      onClick={() => deleteArticle(a.id)}
                      className="px-3 py-2 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 transition"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
