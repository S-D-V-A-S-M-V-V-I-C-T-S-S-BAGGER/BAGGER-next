export async function get<Response>(url: string): Promise<Response> {
  const response = await fetch(url);
  return response.json();
}

export async function post<Response>(
  url: string,
  json?: object,
): Promise<Response> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  return response.json();
}
