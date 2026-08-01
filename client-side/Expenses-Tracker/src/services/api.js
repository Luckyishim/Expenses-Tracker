import { clearSession, getSession } from "./session";

// Centralizes authenticated API requests so user IDs never come from form data.
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5067/api").replace(/\/$/, "");

const readBody = async (response) => response.json().catch(() => ({}));

const request = async (path, options = {}) => {
  const session = getSession();
  if (!session) throw new Error("Please log in to continue");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${session.token}`,
      ...options.headers,
    },
  });
  const body = await readBody(response);

  if (!response.ok) {
    if (response.status === 401) clearSession();
    throw new Error(body.message || "Request failed");
  }
  return body;
};

export const api = {
  getTransactions: () => request("/transactions"),
  getBalance: () => request("/transactions/balance"),
  createTransaction: (transaction) => request("/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  }),
  updateTransaction: (id, transaction) => request(`/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  }),
  deleteTransaction: (id) => request(`/transactions/${id}`, { method: "DELETE" }),
  getProfile: () => request("/auth/me"),
  updateProfile: (fullName) => request("/auth/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName }),
  }),
};
