export const fetchCsrfToken = async (setCsrfToken: (token: string) => void) => {
  const response = await fetch(
    "https://api.canadianhealthcarecrisis.com/generate-token",
    {
      credentials: "include",
    },
  );
  const data = await response.json();
  setCsrfToken(data.csrfToken);
};
