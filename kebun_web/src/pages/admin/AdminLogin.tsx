import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      const token = res.data?.access_token;
      if (token) localStorage.setItem("access_token", token);
      nav("/admin");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div className="hidden lg:block">
          <div className="rounded-[2.5rem] p-10 bg-white/70 border border-emerald-100 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black">
              Admin Panel
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-dark">
              Kelola produk dan artikel dengan cepat.
            </h1>
            <p className="mt-3 text-slate-600 text-base">
              Masuk untuk menambah menu, artikel, serta mengatur konten landing page Kebun Merdesa.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-2" />
                <span>Update produk dan harga tanpa reload halaman.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-2" />
                <span>Upload gambar untuk listing yang lebih menarik.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-2" />
                <span>Manajemen artikel untuk edukasi pelanggan.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:underline">
            ← Kembali ke Website
          </Link>

          <div className="mt-4 rounded-[2.5rem] border border-slate-200/70 bg-white shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black">
                Admin Panel
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-dark">Login Admin</h2>
              <p className="text-slate-600 mt-2 text-sm">
                Gunakan akun seed: <span className="font-bold text-dark">admin@kebunmerdesa.com</span> /{" "}
                <span className="font-bold text-dark">admin123</span>
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
                {err ? (
                  <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-semibold">
                    {err}
                  </div>
                ) : null}

                <div>
                  <label htmlFor="admin-email" className="text-xs font-black text-slate-600 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    id="admin-email"
                    name="email"
                    className="mt-1 w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="text-xs font-black text-slate-600 uppercase tracking-widest">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    name="password"
                    type="password"
                    className="mt-1 w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-600 text-white font-black shadow-sm hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Login..." : "Login"}
                </button>
              </form>
            </div>

            <div className="px-8 py-5 bg-slate-50 border-t border-slate-200/70">
              <p className="text-xs text-slate-600">
                Tips: pastikan API berjalan (Laravel) dan base URL frontend sudah benar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
