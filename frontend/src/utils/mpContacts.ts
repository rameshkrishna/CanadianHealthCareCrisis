import type { Contact } from "../types/contact";
import Papa from "papaparse";
export const fetchContacts = async (
  csrfToken: string,
  setContacts: (contacts: Contact[]) => void,
) => {
  try {
    const response = await fetch(
      "https://api.canadianhealthcarecrisis.com/contacts",
      {
        method: "GET",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      },
    );

    const csvText = await response.text();
    const parsedData = Papa.parse<Contact>(csvText, {
      header: true,
      skipEmptyLines: true,
    });
    setContacts(parsedData.data);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
