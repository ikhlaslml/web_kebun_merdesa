export default function About() {
  return (
    <div className="bg-primarySoft/40">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-primary text-xs font-black uppercase tracking-widest">Tentang</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2 text-dark">
          Kebun <span className="text-primary">Merdesa</span>
        </h1>

        <p className="text-slate-600 mt-4 leading-relaxed">
          Kebun Merdesa adalah ruang belajar, kolaborasi, dan kopi lokal untuk pengembangan masyarakat.
          Dari roasting hingga seduh, dari kebun hingga komunitas.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {
            [
              {
                title: "Pusat Pembelajaran & Pengembangan",
                desc: "Ruang belajar dan penguatan komunitas berbasis pengalaman lapangan.",
                image: "/assets/about/gambar3.jpeg",
              },
              {
                title: "Coffee Roaster & Collaborative Space",
                desc: "Ngopi, diskusi, kolaborasi, dan edukasi kopi yang mudah dipahami.",
                image: "/assets/about/gambar4.jpeg",
              },
              {
                title: "Agricultural Learning Center",
                desc: "Belajar pertanian, praktik baik, dan pengembangan masyarakat.",
                image: "/assets/about/gambar5.jpeg",
              },
              {
                title: "Artikel / Opini Kopi",
                desc: "Bacaan ringan seputar kopi, roasting, seduh, dan cerita komunitas.",
                image: "/assets/about/gambar13.jpg",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-[2rem] border border-slate-200/70 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-500">Kebun Merdesa</div>
                  <h2 className="font-black text-xl mt-2 text-dark">{c.title}</h2>
                  <p className="text-slate-600 mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="mt-10 rounded-[2rem] bg-primary text-white p-7 md:p-8">
          <div className="text-xs font-black uppercase tracking-widest text-white/80">Visi</div>
          <div className="mt-2 text-xl md:text-2xl font-black">
            Membesarkan dampak: kopi sebagai pintu kolaborasi & pembelajaran masyarakat.
          </div>
        </div>
      </section>
    </div>
  );
}
