export const dressCode = {
  label: "dress code",
  title: "Палитра\nдля образа",
  description:
    "Важнее всего ваше присутствие — но мы будем крайне благодарны, если вы поддержите цветову гамму нашей свадьбы. Это добавит торжественности и элегантности нашему празднику. Не бойтесь черного и светлых цветов, ведь мы сами их выбрали",
  palette: [
    { name: "Black", hex: "#0B0B0D", var: "--black", dark: true },
    { name: "Dark Chocolate", hex: "#341F1A", var: "--dark-chocolate", dark: true },
    { name: "Hazelnut", hex: "#CFB59E", var: "--hazelnut", dark: false },
    { name: "Snow", hex: "#FFFAFA", var: "--snow", dark: false },
    { name: "Columbia Blue", hex: "#B9D9EB", var: "--columbia-blue", dark: false },
  ],
} as const;
