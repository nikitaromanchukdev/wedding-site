import { site } from "../site";

export const rsvp = {
  label: "RSVP",
  title: "Вы присоединитесь к нам?",
  description: `Пожалуйста, подтвердите свое присутствие до ${site.rsvpDeadline}. Мы ждем не дождемся, чтобы отпраздновать вместе наш день вместе с вами.`,
  submitLabel: "Отправить ответ",
  submittingLabel: "Отправка...",
  successMessage: "Спасибо — ваш ответ получен.",
  errorMessage: "Что-то пошло не так. Пожалуйста, попробуйте ещё раз.",
  comingSoonMessage: "Приём ответов скоро откроется. Загляните ближе к дате.",
  cta: {
    label: "Жмяк сюда",
    // Server redirect — real URL lives in the RSVP_URL env var, resolved by /go/rsvp.
    href: "/go/rsvp",
  },
  fields: {
    name: {
      label: "Ваше имя",
      placeholder: "Полное имя",
    },
    attending: {
      label: "Придёте?",
      placeholder: "Выберите ответ",
      options: [
        { value: "yes", label: "С радостью приду" },
        { value: "no", label: "К сожалению, не смогу" },
      ],
    },
    message: {
      label: "Сообщение (необязательно)",
      placeholder: "Поделитесь пожеланиями...",
    },
  },
} as const;
