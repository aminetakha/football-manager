export default async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(JSON.stringify(errorResponse));
  }

  const data: T = await response.json();
  return data;
};
