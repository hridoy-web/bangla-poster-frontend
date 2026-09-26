const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const registerService = async (userData: {
  name: string;
  emailOrPhone: string;
  password: string;
  role?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("API endpoint not found or backend returned invalid response.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed.');
  }

  if (data.data?.token) {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    window.dispatchEvent(new Event("auth-change"));
  }

  return data;
};

export const loginService = async (credentials: {
  emailOrPhone: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("API endpoint not found or backend returned invalid response.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Invalid credentials.');
  }

  if (data.data?.token) {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    window.dispatchEvent(new Event("auth-change"));
  }

  return data;
};

export const logoutService = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event("auth-change"));
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};