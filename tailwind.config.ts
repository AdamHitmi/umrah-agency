import type {Config} from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        gold: {
          100: "#f7edd0",
          200: "#efd99e",
          300: "#debf69",
          400: "#c8a84a",
          500: "#a88428"
        },
        sand: {
          50: "#f7f1e8",
          100: "#eadcc5",
          200: "#d5c0a0",
          300: "#bea17a"
        },
        noir: {
          950: "#0b0907",
          900: "#14110d",
          800: "#211b14"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem"
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        arabic: ["var(--font-arabic)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 12px 45px rgba(217, 176, 79, 0.18)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.38)"
      },
      backgroundImage: {
        radial:
          "radial-gradient(circle at top, rgba(200, 168, 74, 0.12), transparent 45%)",
        mesh:
          "linear-gradient(135deg, rgba(200, 168, 74, 0.12), transparent 35%), linear-gradient(315deg, rgba(245, 232, 204, 0.12), transparent 30%)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
