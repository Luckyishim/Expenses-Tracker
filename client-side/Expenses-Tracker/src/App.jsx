import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Home from './pages/Home'
import Transaction from './pages/Transaction'
import Summary from './pages/Summary'
import Profile from './pages/Profile'
import ProtectedRoute from "./components/ProtectedRoute";

// Defines public account pages and guards all personal finance pages behind login.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
