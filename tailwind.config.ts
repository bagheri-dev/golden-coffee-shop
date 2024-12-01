import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		container : {
			center : true,
			padding : {
				DEFAULT : "1rem",
				lg : "0.625rem"
			}
		},
    backgroundImage : {
      "home-mobile" : "url(/images/headerBgMobile.webp)",
      "home-desktop" : "url(/images/headerBgDesktop.webp)"
    },
      colors: {
        brown: {
          "100": "#ECE0D1",
          "300": "#DBC1AC",
          "600": "#967259",
          "900": "#634832",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        normal: "0px 1px 10px rgba(0, 0, 0, 0.05 )",
      },
      fontFamily: {
        Dana: "Dana",
        DanaMedium: "Dana Medium",
        DanaDemiBold: "Dana DemiBold",
        MorabbaLight: "Morabba Light",
        MorabbaMedium: "Morabba Medium",
        MorabbaBold: "Morabba Bold",
      },
      letterSpacing: {
        tightest: "-0.065em",
      },
      spacing: {
        "30": "7.5rem",
        "25" : "6.25rem",
        "50" : "12.5rem"
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        slideOut: "slideOut 0.3s ease-in",
      },
    },
    screens: {
      xs : "480px" ,
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({
      addVariant,
    }: {
      addVariant: (name: string, rule: string) => void;
    }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
} satisfies Config;
