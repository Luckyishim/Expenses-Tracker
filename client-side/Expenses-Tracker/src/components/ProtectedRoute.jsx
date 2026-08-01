import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "../services/session";

// Blocks direct URL access until the browser has a valid signed-in session.
function ProtectedRoute() {
  const location = useLocation();
  const [session, setSession] = useState(getSession());

  useEffect(() => {
    const syncSession = () => setSession(getSession());
    window.addEventListener("moneyTrackerSessionChanged", syncSession);
    window.addEventListener("storage", syncSession);
    return () => {
      window.removeEventListener("moneyTrackerSessionChanged", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return session
    ? <Outlet />
    : <Navigate to="/login" replace state={{ message: "Please log in to continue", from: location.pathname }} />;
}

export default ProtectedRoute;
