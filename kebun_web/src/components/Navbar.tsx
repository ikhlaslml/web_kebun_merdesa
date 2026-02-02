import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/menu", label: "Produk" },
  { to: "/articles", label: "Artikel" },
  { to: "/about", label: "Tentang" },
  { to: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const loc = useLocation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const active = useMemo(() => loc.pathname, [loc.pathname]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    // simpel: arahkan ke halaman artikel + query param
    const query = q.trim();
    nav(query ? `/articles?search=${encodeURIComponent(query)}` : "/articles");
  };

  return (
    <header className="sticky top-0 z-50">
      {/* top bar */}
      <div className="bg-zinc-950 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/10 overflow-hidden grid place-items-center">
              <img
                src="/assets/brand/logo_kebunmerdesa-fotor-20260202235655.png"
                alt="Logo Kebun Merdesa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <img
                src="/assets/brand/teks_kebunmerdesa.jpeg"
                alt="Kebun Merdesa"
                className="h-7 md:h-8 object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* desktop search */}
            <form onSubmit={onSubmit} className="hidden md:flex items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari artikel kopi..."
                className="w-64 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400"
              />
              <button className="ml-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-black text-sm">
                Cari
              </button>
            </form>

            <Link
              to="/admin/login"
              className="hidden md:inline-flex px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 font-black text-sm"
            >
              Masuk
            </Link>

            {/* mobile button */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden px-3 py-2 rounded-xl bg-white/10 border border-white/10 font-black text-sm"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {/* nav bar */}
      <div className="bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <nav className="hidden md:flex items-center gap-6 text-sm font-black text-slate-700">
            {NAV.map((it) => {
              const isActive =
                it.to === "/"
                  ? active === "/"
                  : active.startsWith(it.to);

              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={
                    isActive
                      ? "text-emerald-700"
                      : "hover:text-emerald-700"
                  }
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-black text-sm"
            >
              Navigasi
            </button>
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-xl bg-zinc-950 text-white font-black text-sm"
            >
              Masuk
            </Link>
          </div>

          <a
            href="https://wa.me/628XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex px-4 py-2 rounded-xl bg-zinc-950 text-white font-black text-sm hover:bg-zinc-900"
          >
            Pesan via WhatsApp
          </a>
        </div>

        {/* mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Cari artikel kopi..."
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-sm">
                  Cari
                </button>
              </form>

              <div className="grid gap-2">
                {NAV.map((it) => (
                  <Link
                    key={it.to}
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl border border-slate-200 bg-white font-black text-sm text-slate-800 hover:bg-slate-50"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>

              <a
                href="https://wa.me/628XXXXXXXXXX"
                target="_blank"
                rel="noreferrer"
                className="block text-center px-4 py-3 rounded-xl bg-zinc-950 text-white font-black text-sm"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

