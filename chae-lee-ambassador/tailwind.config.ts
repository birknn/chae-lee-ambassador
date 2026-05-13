import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kb: {
          cream: "#FDF8F5",
          petal: "#F7E8EC",
          rose: "#F0D4DC",
          blush: "#C4869B",
          mauve: "#A06880",
          plum: "#6B3A52",
          deep: "#1C0A14",
          gold: "#C9A87A",
          muted: "#8C5F72",
          card: "rgba(255,255,255,0.82)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out 3s infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "blush-glow": "0 8px 32px rgba(196, 134, 155, 0.25)",
        "card-luxury": "0 4px 24px rgba(28, 10, 20, 0.08)",
        "option-selected": "0 0 0 2px rgba(196, 134, 155, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
