import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDF8F5] via-[#F7E8EC] to-[#EDD5DF]">
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      <div className="absolute top-[-8%] right-[-12%] w-80 h-80 rounded-full bg-kb-rose/35 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-[-6%] left-[-10%] w-64 h-64 rounded-full bg-kb-mauve/25 blur-3xl animate-float-delay pointer-events-none" />
      <div className="absolute top-[35%] left-[-6%] w-44 h-44 rounded-full bg-kb-petal/50 blur-2xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-4%] w-36 h-36 rounded-full bg-kb-rose/30 blur-2xl animate-float pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-sm mx-auto">
        <div className="mb-10 animate-fade-up">
          <p className="text-kb-blush text-[10px] tracking-[0.35em] uppercase font-body font-medium mb-4">
            Premium K-Beauty Experience
          </p>
          <h1 className="font-display font-light text-kb-deep leading-none" style={{ fontSize: "clamp(3rem, 12vw, 4.5rem)", letterSpacing: "0.12em" }}>
            CHAE LEE
          </h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-10 bg-kb-gold/60" />
            <span className="text-kb-gold text-xs tracking-widest">✦</span>
            <div className="h-px w-10 bg-kb-gold/60" />
          </div>
          <p className="text-kb-muted font-body text-[11px] tracking-[0.22em] uppercase font-medium">
            Ambassador Program
          </p>
        </div>
        <div className="w-full glass-card rounded-3xl p-7 mb-8 shadow-card-luxury">
          <div className="w-8 h-8 rounded-full bg-kb-petal flex items-center justify-center mx-auto mb-4">
            <span className="text-kb-blush text-base">✦</span>
          </div>
          <p className="text-kb-deep font-body text-[15px] leading-relaxed mb-3">
            Chae Lee ile birlikte Kore güzellik markalarının yeni yüzlerini arıyoruz. Sen de bu deneyimin bir parçası olmak ister misin?
          </p>
          <p className="text-kb-muted font-body text-[13px] leading-relaxed">
            Etkinlik sırasında paylaşacağın story, reels ve içerikler seçilme şansını artırabilir ✨
          </p>
        </div>
        <Link href="/apply" className="w-full">
          <button className="w-full py-[18px] px-8 rounded-2xl btn-shimmer text-white font-body font-medium text-base tracking-wide shadow-blush-glow active:scale-[0.97] transition-transform duration-150">
            Start Application →
          </button>
        </Link>
        <p className="mt-5 text-kb-muted/55 text-[11px] font-body tracking-wide">
          ~3 dakika • 20 soru • ücretsiz
        </p>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
        {["✦", "✧", "✦", "✧", "✦"].map((s, i) => (
          <span key={i} className="text-kb-blush/30 text-[10px] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
            {s}
          </span>
        ))}
      </div>
    </main>
  );
}
