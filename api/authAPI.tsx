import { UserLogin } from "../interfaces/UserLogin";

const BASE_URL = 'http://localhost:3001'; // Update to match your server URL

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json(); // Ensure that you are getting the token back here
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw error to handle it in the component
  }
};

export { login };



