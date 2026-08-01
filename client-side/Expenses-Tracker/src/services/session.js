// Stores the signed-in user's minimal profile and session token in one shared place.
const USER_KEY = "moneyTrackerUser";
const TOKEN_KEY = "moneyTrackerToken";

export const getSession = () => {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    const token = localStorage.getItem(TOKEN_KEY);
    return user && token ? { user, token } : null;
  } catch {
    return null;
  }
};

export const saveSession = ({ user, token }) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("moneyTrackerSessionChanged"));
};

export const clearSession = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("moneyTrackerSessionChanged"));
};
