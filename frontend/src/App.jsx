import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Borrow from "./pages/Borrow";
import Users from "./pages/Users";
import Layout from "./pages/Layout";

function App() {
  const auth = localStorage.getItem("auth");

  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={auth ? <Layout /> : <Navigate to="/" />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="borrow" element={<Borrow />} />
        <Route path="users" element={<Users />} />
      </Route>

    </Routes>
  );
}

export default App;