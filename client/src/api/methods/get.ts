export default async (url: string) => {
  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(JSON.stringify(errorResponse));
  }

  const data = await response.json();
  return data;
};
