export const dressCode = {
  label: "Дресс-код",
  title: "Палитра\nдля образа",
  description:
    "Важнее всего ваше присутствие — но если вы захотите одеться в тон вечеру, будем рады, если вы вдохновитесь нашей палитрой. Тёплые нейтральные тона и мягкие голубые оттенки. Пожалуйста, избегайте белого.",
  palette: [
    { name: "Black", hex: "#0B0B0D", var: "--black", dark: true },
    { name: "Dark Chocolate", hex: "#341F1A", var: "--dark-chocolate", dark: true },
    { name: "Hazelnut", hex: "#CFB59E", var: "--hazelnut", dark: false },
    { name: "Snow", hex: "#FFFAFA", var: "--snow", dark: false },
    { name: "Columbia Blue", hex: "#B9D9EB", var: "--columbia-blue", dark: false },
  ],
} as const;
