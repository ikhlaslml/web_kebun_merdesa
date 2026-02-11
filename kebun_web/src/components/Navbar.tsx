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
    <header className="fixed top-2 left-0 right-0 z-50 px-3 md:px-4">
      {/* header */}
      <div className="overflow-hidden rounded-[24px] bg-emerald-800/60 text-white border border-white/20 backdrop-blur-xl shadow-[0_14px_40px_rgba(5,46,22,0.24)]">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="leading-tight">
              <img
                src="/assets/brand/teks_kebunmerdesa.png"
                alt="Kebun Merdesa"
                className="h-7 md:h-8 object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-7 text-[13px] font-semibold tracking-wide text-white/95">
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
                      ? "text-white border-b-2 border-white/80 pb-1"
                      : "text-white/90 hover:text-white"
                  }
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            {/* desktop search */}
            <form onSubmit={onSubmit} className="hidden md:flex items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari artikel kopi..."
                className="h-10 w-64 bg-white/95 text-slate-900 border border-white/80 rounded-[18px] px-3.5 py-0 text-[13px] font-medium outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-white/40 focus:border-white"
              />
              <button
                aria-label="Search"
                className="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-[18px] bg-white text-slate-900 border border-white/70 hover:bg-white/90"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>
              </button>
            </form>

            <a
              href="https://wa.me/628XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex h-10 items-center px-4 rounded-[18px] bg-emerald-950 text-white font-semibold text-[13px] hover:bg-emerald-900"
            >
              Pesan via WhatsApp
            </a>

            {/* mobile button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-[18px] bg-white/15 border border-white/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden mt-2 overflow-hidden rounded-[24px] border border-emerald-900/15 bg-white/95 backdrop-blur-md shadow-[0_14px_40px_rgba(5,46,22,0.18)]">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari artikel kopi..."
                className="h-10 flex-1 border border-slate-200 rounded-[18px] px-3 py-0 text-sm outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
              <button
                aria-label="Search"
                className="inline-flex items-center justify-center w-10 h-10 rounded-[18px] bg-white text-slate-900 border border-slate-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>
              </button>
            </form>

            <div className="grid gap-2">
              {NAV.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-[18px] border border-slate-200 bg-white font-semibold text-[13px] text-slate-800 hover:bg-slate-50"
                >
                  {it.label}
                </Link>
              ))}
            </div>

            <a
              href="https://wa.me/628XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="block text-center h-10 leading-10 rounded-[18px] bg-emerald-950 text-white font-semibold text-[13px]"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

