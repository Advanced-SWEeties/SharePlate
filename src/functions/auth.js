import { useUser } from "../context/UserContext";

export const baseLogin = async (username, password) => {
  const {login} = useUser()
  const data = {
    username,
    password,
  };

  try {
    // Send POST request to login API
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      login()
    } else {
      throw new Error(result.message || 'Login failed');
    }
  } catch (error) {
    // Handle any errors (network issues, etc.)
    throw new Error(error.message || 'An error occurred during login.');
  }
};
