const API_BASE_URL = process.env.REACT_APP_BACKEND_URL as string;

export const apiGetRequest = async <T = any>(
  endpoint: string,              
  params?: Record<string, any>, 
  token?: string,                
): Promise<T> => {
  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`; // Append the query string to the URL
  }

  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(headers)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers, 
    });

    if (!response.ok) {
      const result = await response.json();
      if (result.message) {
        console.error(result.message);
      } else {
        console.error(`API Error: ${response.status} ${response.statusText}`);
      }
      throw new Error(result.message || `API Error: ${response.status} ${response.statusText}`);
    }
    console.log("waiting here")
    return await response.json();
  } catch (error) {
    console.error(error || 'An error occurred during the GET request.');
    throw error; 
  }
};


export const apiPostRequest = async <T = any>(
  endpoint: string,
  data: Record<string, any>, 
  token?: string,
): Promise<T> => {
  // Build the request URL
  const url = `${API_BASE_URL}${endpoint}`;

  // Prepare the request options
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',  // Content type for the request body
  };

  // If a token is provided, add it to the Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Try to make the request
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error || 'An error occurred during the POST request.');
    throw error; 
  }
};