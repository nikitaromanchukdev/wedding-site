export const dressCode = {
  label: "Dress Code",
  title: "A palette\nto wear",
  description:
    "Your presence is what matters most — but if you'd like to dress in tune with the evening, we'd love for you to draw from our palette. Warm neutrals and soft blues. Please avoid white.",
  palette: [
    { name: "Black", hex: "#0B0B0D", var: "--black", dark: true },
    { name: "Coffee", hex: "#6F4E37", var: "--coffee", dark: true },
    { name: "Hazelnut", hex: "#CFB59E", var: "--hazelnut", dark: false },
    { name: "Snow", hex: "#FFFAFA", var: "--snow", dark: false },
    { name: "Columbia Blue", hex: "#B9D9EB", var: "--columbia-blue", dark: false },
  ],
} as const;
