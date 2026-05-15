import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🧪 Lab System</h2>

        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/equipment">📦 Equipment</Link>
        <Link to="/borrow">🔄 Borrow</Link>
        <Link to="/users">👨‍🎓 Users</Link>

        <button onClick={logout}>🚪 Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        <Outlet />
      </div>

    </div>
  );
}