import { dressCode } from "@/resources";

/** Mobile-only palette view: full-bleed colour bands (see photo 2). Hidden on desktop via CSS. */
export function PaletteBands() {
  return (
    <section id="palette" aria-label="Colour palette">
      <ul className="band-grid">
        {dressCode.palette.map((color) => (
          <li key={color.name} className="band" data-dark={String(color.dark)}>
            <span
              className="band-fill"
              style={{ background: `var(${color.var})` }}
              aria-hidden="true"
            />
            <span className="band-name">{color.name}</span>
            <span className="band-hex">{color.hex}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
