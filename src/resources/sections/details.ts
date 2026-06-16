import { site } from "../site";

export type BodySegment = { text: string; strong?: boolean };

export const details = {
  label: "Полезно знать",
  title: "Всё, что\nвам нужно",
  cards: [
    {
      icon: "◈",
      title: "Как добраться",
      body: [
        { text: site.venue, strong: true },
        { text: ` расположена на берегу ${site.location}. Частный трансфер будет организован от ` },
        { text: "станции Como", strong: true },
        { text: ". Шаттл будет курсировать между площадкой и местными отелями в течение всего вечера." },
      ] as BodySegment[],
    },
    {
      icon: "◇",
      title: "Подарки",
      body: [
        { text: "Ваше присутствие — лучший подарок. Если вы захотите внести вклад, мы собираем " },
        { text: "фонд на путешествия", strong: true },
        { text: " для нашего медового месяца. Подробности сообщим после подтверждения вашего участия." },
      ] as BodySegment[],
    },
  ],
};
