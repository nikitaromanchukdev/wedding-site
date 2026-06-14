# Dress-code example photos

Drop outfit inspiration images here (e.g. `look-1.jpg` … `look-8.jpg`).

Recommended: portrait JP/WebP, ~800×1100px, optimized (<300 KB each).

Wire them up in `src/resources/sections/dressCodeExamples.ts`:

```ts
import look1 from "@/assets/dress-code/look-1.jpg";
// ...
{ id: "look-1", src: look1, /* ... */ },
```

Static imports give automatic `width`/`height`/`blurDataURL`, enabling
blur-up lazy loading via `next/image` `placeholder="blur"`. Until a card's
`src` is set, it renders a palette-tinted gradient placeholder.
