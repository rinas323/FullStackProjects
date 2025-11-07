const API = "http://localhost:4000";

export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // send cookies
  });
  return res.json();
}

