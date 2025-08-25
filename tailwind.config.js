/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976D3",
        lightPrimary: "#F6FAFD",
        red: "#EA4335",
        navy: "#144271",
        purple: "#6E5AED",
        cyan: "#19B1D4",

        black12: "#121212",
        black2: "#222222",
        black3: "#333333",
        black4: "#444444",
        black5: "#555555",
        black6: "#666666",

        gray7: "#777777",
        gray8: "#888888",
        gray9: "#999999",
        graye5: "#e5e5e5",
        graye9: "#e9e9e9",
        grayf5: "#f5f5f5",
        grayf9: "#f9f9f9",
        graycc: "#CCCCCC",
      },
      screens: {
        "max-xl1240": { max: "1240px" },
        "max-xl1023": { max: "1023px" },
        "max-xl767": { max: "767px" },
      },
    },
  },
  // plugins: [require("daisyui")],
};
