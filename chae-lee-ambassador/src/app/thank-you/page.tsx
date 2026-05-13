"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const HASHTAG = process.env.NEXT_PUBLIC_EVENT_HASHTAG ?? "#ChaeLeeKBeauty";
const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "@chaelee.beauty";

export default function ThankYouPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const shareText = encodeURIComponent(
    `Chae Lee K-Beauty Ambassador programına başvurdum ✨ ${HASHTAG}`
  );
  const instagramUrl = `https://www.instagram.com/`;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDF8F5] via-[#F7E8EC] to-[#EDD5DF] px-6">
      {/* Orbs */}
      <div className="absolute top-[-10%] right-[-15%] w-80 h-80 rounded-full bg-kb-rose/30 blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-[-6%] left-[-8%] w-64 h-64 rounded-full bg-kb-mauve/20 blur-3xl pointer-events-none animate-float-delay" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      <div
        className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center text-center transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
      >
        {/* Animated checkmark */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-kb-petal to-kb-rose flex items-center justify-center shadow-blush-glow">
            <svg
              className="w-10 h-10 text-kb-blush"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Sparkles */}
          {["top-0 -right-2", "bottom-1 -left-3", "top-2 -left-1"].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} text-kb-gold animate-pulse`}
              style={{ animationDelay: `${i * 0.4}s`, fontSize: i === 0 ? "18px" : "12px" }}
            >
              ✦
            </span>
          ))}
        </div>

        {/* Heading */}
        <h1 className="font-display text-[2rem] text-kb-deep font-medium leading-tight mb-2">
          Başvurun Alındı ✨
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-kb-gold/50" />
          <span className="text-kb-gold text-[10px] tracking-widest">CHAE LEE</span>
          <div className="h-px w-8 bg-kb-gold/50" />
        </div>

        {/* Message card */}
        <div className="w-full glass-card rounded-3xl p-7 mb-8 shadow-card-luxury text-left">
          <p className="text-kb-deep font-body text-[15px] leading-relaxed mb-4">
            Chae Lee creator ekibi başvuruları inceleyecek ve seçilen adaylarla iletişime geçecek.
          </p>
          <div className="flex items-start gap-3 py-3 border-t border-kb-rose/30">
            <span className="text-kb-blush mt-0.5">💡</span>
            <p className="text-kb-muted font-body text-[13px] leading-relaxed">
              Etkinlik sırasında paylaşacağın{" "}
              <strong className="text-kb-blush">story, reels ve içerikler</strong> seçilme şansını
              artırabilir 💫
            </p>
          </div>
          <div className="flex items-start gap-3 py-3 border-t border-kb-rose/30">
            <span className="text-kb-blush mt-0.5">📍</span>
            <p className="text-kb-muted font-body text-[13px] leading-relaxed">
              Etkinliği takip etmek için{" "}
              <strong className="text-kb-blush">{INSTAGRAM}</strong> hesabını takip et
            </p>
          </div>
        </div>

        {/* Hashtag chip */}
        <div className="flex items-center gap-2 bg-kb-blush/10 border border-kb-blush/30 rounded-full px-5 py-2.5 mb-7">
          <span className="text-kb-blush font-body font-medium text-sm">{HASHTAG}</span>
        </div>

        {/* CTA buttons */}
        <div className="w-full flex flex-col gap-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-[17px] rounded-2xl btn-shimmer text-white font-body font-medium text-base tracking-wide shadow-blush-glow active:scale-[0.97] transition-transform duration-150 text-center block"
          >
            Instagram&apos;da Paylaş 📸
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-[16px] rounded-2xl border border-kb-blush/40 text-kb-blush font-body font-medium text-[14px] tracking-wide active:scale-[0.97] transition-transform duration-150 text-center block bg-white/70"
          >
            Story Paylaş ✨
          </a>

          <Link href="/" className="block">
            <button className="w-full py-3 text-[13px] text-kb-muted/60 font-body">
              Ana sayfaya dön
            </button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-[11px] text-kb-muted/40 font-body leading-relaxed">
          Chae Lee K-Beauty Ambassador Program<br />
          Tüm hakları saklıdır.
        </p>
      </div>
    </main>
  );
}
