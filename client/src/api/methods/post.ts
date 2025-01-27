export default async <T, R>(url: string, body?: T): Promise<R> => {
  const response = await fetch(url, {
    method: "post",
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(JSON.stringify(errorResponse));
  }

  const data: R = await response.json();
  return data;
};
