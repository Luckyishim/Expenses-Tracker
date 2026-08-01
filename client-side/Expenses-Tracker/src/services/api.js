const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5067/api").replace(/\/$/, "");

const getCurrentUserId = () => {
  const storedUser = localStorage.getItem("moneyTrackerUser");
  return storedUser ? JSON.parse(storedUser).id : null;
};

const getUserQuery = () => {
  const userId = getCurrentUserId();
  return userId ? `?user=${encodeURIComponent(userId)}` : "";
};

const readError = async (response, fallbackMessage) => {
  const payload = await response.json().catch(() => ({}));
  return payload.error || payload.message || fallbackMessage;
};

export const api = {
  async getTransactions() {
    const response = await fetch(`${API_URL}/transactions${getUserQuery()}`);
    if (!response.ok) {
      throw new Error(await readError(response, "Failed to fetch transactions"));
    }
    return response.json();
  },

  async getBalance() {
    const response = await fetch(`${API_URL}/transactions/balance${getUserQuery()}`);
    if (!response.ok) {
      throw new Error(await readError(response, "Failed to fetch balance"));
    }
    return response.json();
  },

  async createTransaction(transactionData) {
    const user = getCurrentUserId();
    if (!user) {
      throw new Error("Please log in before adding a transaction");
    }

    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...transactionData, user }),
    });
    if (!response.ok) {
      throw new Error(await readError(response, "Failed to create transaction"));
    }
    return response.json();
  },

  async updateTransaction(id, transactionData) {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) {
      throw new Error(await readError(response, "Failed to update transaction"));
    }
    return response.json();
  },

  async deleteTransaction(id) {
    const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(await readError(response, "Failed to delete transaction"));
    }
    return response.json();
  },
};
