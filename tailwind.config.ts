// tailwind.config.ts

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-up-delay": "fadeUp 0.4s ease-out 0.3s forwards",
        "fade-up-delay-2": "fadeUp 0.4s ease-out 0.6s forwards",
      },

      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px) scale(0.98)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
      },

      colors: {
        /*
        BACKGROUNDS
        */

        paper: "#191613", // main background
        panel: "#241F1A", // cards/navbar
        elevated: "#312922", // hover states
        border: "#4B4036", // outlines
        muted: "#A89684",
        /*
        TEXT
        */

        ink: "#F6E8D5", // primary text
        faded: "#BFAE99", // secondary text
        ghost: "#7E7164", // disabled text

        /*
        BRAND
        */

        amber: "#D79B5B", // primary buttons
        copper: "#B66A3C", // secondary accent
        teal: "#4F8A8B", // links/focus states
        olive: "#718355", // success

        /*
        STATUS
        */

        success: "#6D8B5A",
        warning: "#D4A04D",
        error: "#B55442",
        /*
        RETRO EXTRAS
        */

        terminal: "#8FD694", // CRT green
        magenta: "#C97BA5", // synthwave accent
        gold: "#E6C07B", // highlights
        aged: "#DFA052",
        antique: "#C08946",
      },

      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],

        body: ["IBM Plex Sans", "sans-serif"],

        mono: ["IBM Plex Mono", "monospace"],
      },

      borderRadius: {
        panel: "14px",
        retro: "6px",
      },

      boxShadow: {
        panel: "0 8px 24px rgba(0,0,0,0.45)",

        glow: "0 0 20px rgba(215,155,91,0.25)",

        crt: "0 0 12px rgba(143,214,148,0.15)",
      },

      backgroundImage: {
        noise: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",

        retro: "linear-gradient(180deg,#241F1A 0%,#191613 100%)",
      },

      backgroundSize: {
        noise: "6px 6px",
      },
    },
  },

  plugins: [],
} satisfies Config;
