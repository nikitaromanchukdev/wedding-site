import { site } from "../site";

export type BodySegment = { text: string; strong?: boolean };

export const details = {
  label: "good to know",
  title: "Всё, что вам нужно",
  cards: [
    {
      icon: "◈",
      title: "Как добраться",
      body: [
        { text: "Ближе к празднику ", strong: true },
        { text: `мы свяжемся с вами и уточним, как вы планируете добираться. Если понадобится трансфер, ` },
        { text: "не переживайте ", strong: true },
        { text: " — всё организуем 🤍" },
      ] as BodySegment[],
    },
    {
      icon: "◇",
      title: "Подарки",
      body: [
        { text: "Ваше присутствие — " },
        { text: "лучший подарок. ", strong: true },
        { text: "Пожалуйста, " },
        { text: "не дарите цветы", strong: true },
        { text: ". Мы их, конечно, очень любим, но они не успеют даже попасть в вазу, прежде чем наш кот с ними расправится." }
      ] as BodySegment[],
    },
  ],
};
