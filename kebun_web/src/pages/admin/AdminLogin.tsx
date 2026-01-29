import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@kebunmerdesa.com");
  const [password, setPassword] = useState("admin123");
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
    <div className="min-h-screen bg-primarySoft/50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline">
          ← Kembali ke Website
        </Link>

        <div className="mt-4 rounded-[2.5rem] border border-slate-200/70 bg-white shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primarySoft text-primary text-xs font-black">
              Admin Panel
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-dark">Login Admin</h1>
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
                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Email</label>
                <input
                  className="mt-1 w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                disabled={loading}
                className="w-full px-4 py-3 rounded-2xl bg-primary text-white font-black hover:bg-primaryLight transition disabled:opacity-60"
              >
                {loading ? "Masuk..." : "Masuk"}
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
  );
}
