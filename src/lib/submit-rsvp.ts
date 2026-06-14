import {
  getGoogleFormActionUrl,
  getGoogleFormEntryId,
  isGoogleFormConfigured,
} from "@/resources/forms";

export async function submitRsvpToGoogleForm(data: {
  name: string;
  attending: string;
  message: string;
}) {
  if (!isGoogleFormConfigured()) {
    throw new Error("Google Form is not configured. Update src/resources/forms.ts");
  }

  const body = new FormData();
  body.append(getGoogleFormEntryId("name"), data.name);
  body.append(getGoogleFormEntryId("attending"), data.attending);
  body.append(getGoogleFormEntryId("message"), data.message);

  await fetch(getGoogleFormActionUrl(), {
    method: "POST",
    mode: "no-cors",
    body,
  });
}
