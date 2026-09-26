const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const createPosterService = async (formDataPayload: FormData) => {
  const response = await fetch(`${API_BASE_URL}/posters`, {
    method: "POST",
    headers: {
      ...(typeof window !== "undefined" && localStorage.getItem("token") 
          ? { Authorization: `Bearer ${localStorage.getItem("token")}` } 
          : {}),
    },
    body: formDataPayload,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to generate poster.");
  }
  return data;
};

export const getUserPostersService = async () => {
  const response = await fetch(`${API_BASE_URL}/posters/user/history`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch poster history.");
  }
  return data;
};

export const regeneratePosterService = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/posters/${id}/regenerate`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to regenerate poster.");
  }
  return data;
};

export const deletePosterService = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/posters/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete poster.");
  }
  return data;
};