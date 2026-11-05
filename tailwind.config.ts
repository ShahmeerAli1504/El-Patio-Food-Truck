import type { Config } from "tailwindcss";

/**
 * El Patio theme — pulled from the agave logo.
 * Breakpoints mirror the original site: use `max-lg:` (≤1080px), `max-md:` (≤920px), `max-sm:` (≤600px).
 */
const config: Config = {
  // Tailwind v4 reads this through `@config` in globals.css
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "601px",
      md: "921px",
      lg: "1081px",
    },
    extend: {
      colors: {
        ink: "#0b0a09",
        char: { DEFAULT: "#14110e", 2: "#1c1814" },
        line: "rgba(242, 228, 203, 0.12)",
        cream: { DEFAULT: "#f2e4cb", dim: "rgba(242, 228, 203, 0.72)" },
        teal: { DEFAULT: "#3f9aa1", bright: "#5cc0c6" },
        terra: "#c65b33",
        gold: { DEFAULT: "#eab25a", deep: "#d9963a", light: "#f4c272" },
        bone: "#fff3e2",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        caps: ["var(--font-caps)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(.2, .7, .2, 1)",
      },
      keyframes: {
        twinkle: { "0%, 100%": { opacity: "1" }, "50%": { opacity: ".55" } },
        bump: { "40%": { transform: "scale(1.18)" } },
        slowzoom: { to: { transform: "scale(1.12)" } },
        pulse: {
          "70%": { boxShadow: "0 0 0 10px rgba(92,192,198,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(92,192,198,0)" },
        },
        scrollcue: {
          "0%": { opacity: "0", transform: "translateY(0)" },
          "40%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(14px)" },
        },
        marquee: { to: { transform: "translateX(-50%)" } },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        sway: { "0%, 100%": { transform: "rotate(-6deg)" }, "50%": { transform: "rotate(6deg)" } },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        bump: "bump .45s cubic-bezier(.2,.7,.2,1)",
        slowzoom: "slowzoom 22s ease-in-out infinite alternate",
        pulse: "pulse 2s infinite",
        scrollcue: "scrollcue 1.8s infinite",
        marquee: "marquee 38s linear infinite",
        fadeUp: "fadeUp .6s cubic-bezier(.2,.7,.2,1)",
        sway: "sway 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
