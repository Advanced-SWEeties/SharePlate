const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorMessage = `API Error: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
