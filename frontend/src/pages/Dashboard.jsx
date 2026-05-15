import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Dashboard() {
  const [equipment, setEquipment] = useState([]);
  const [users, setUsers] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    totalQuantity: "",
    availableQuantity: "",
    description: "",
  });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const eq = await API.get("/equipment");
      const us = await API.get("/users");
      setEquipment(eq.data);
      setUsers(us.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleAddEquipment = async () => {
    if (!form.name || !form.category || !form.totalQuantity || !form.availableQuantity) {
      setFormError("Please fill in all required fields.");
      return;
    }
    try {
      await API.post("/equipment", {
        name: form.name,
        category: form.category,
        totalQuantity: Number(form.totalQuantity),
        availableQuantity: Number(form.availableQuantity),
        description: form.description,
      });
      setShowModal(false);
      setForm({ name: "", category: "", totalQuantity: "", availableQuantity: "", description: "" });
      loadData();
    } catch (err) {
      setFormError("Failed to add equipment. Please try again.");
    }
  };

  const navItems = [
    { key: "dashboard", icon: "📊", label: "Dashboard" },
    { key: "equipment", icon: "📦", label: "Equipment" },
    { key: "borrow",    icon: "🔄", label: "Borrow"    },
    { key: "users",     icon: "👥", label: "Users"     },
  ];

  return (
    <div className="appLayout">

      {/* ── SIDEBAR ── */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebarLogo">
          <span className="logoIcon">🧪</span>
          {!collapsed && <span className="logoText">Lab System</span>}
          <button className="toggleBtn" onClick={() => setCollapsed(!collapsed)}>☰</button>
        </div>

        <nav className="sidebarNav">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`navItem ${activePage === item.key ? "active" : ""}`}
              onClick={() => setActivePage(item.key)}
            >
              <span className="navIcon">{item.icon}</span>
              {!collapsed && <span className="navLabel">{item.label}</span>}
            </div>
          ))}
        </nav>

        <div className="logoutItem" onClick={handleLogout}>
          <span className="navIcon">🚪</span>
          {!collapsed && <span className="navLabel">Logout</span>}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="mainContent">

        {/* DASHBOARD PAGE */}
        {activePage === "dashboard" && (
          <div>
            <div className="dashboardTop">
              <div>
                <h1>📊 Dashboard</h1>
                <p>Welcome back Admin 👋</p>
              </div>
              <button className="refreshBtn" onClick={loadData}>🔄 Refresh</button>
            </div>

            <div className="dashboardGrid">
              <div className="dashboardCard">
                <div className="cardTop">📦 Total Equipment</div>
                <h2>{equipment.length}</h2>
                <p>Items registered</p>
              </div>
              <div className="dashboardCard">
                <div className="cardTop">👥 Total Users</div>
                <h2>{users.length}</h2>
                <p>Registered users</p>
              </div>
              <div className="dashboardCard">
                <div className="cardTop">✅ Available Items</div>
                <h2>{equipment.reduce((a, b) => a + b.availableQuantity, 0)}</h2>
                <p>Ready to borrow</p>
              </div>
            </div>

            <div className="recentSection">
              <div className="recentHeader">
                <h3>Recent Equipment</h3>
                <button className="smallBtn" onClick={() => setActivePage("equipment")}>
                  View All
                </button>
              </div>
              {equipment.slice(0, 5).map((item) => (
                <div className="recentItem" key={item._id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.category}</p>
                  </div>
                  <div className="recentBadge">{item.availableQuantity}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EQUIPMENT PAGE */}
        {activePage === "equipment" && (
          <div>
            <div className="dashboardTop">
              <div>
                <h1 className="pageTitle">📦 Equipment</h1>
                <p className="pageSub">Manage all lab equipment inventory</p>
              </div>
              <button className="addBtn" onClick={() => setShowModal(true)}>
                + Add Equipment
              </button>
            </div>

            <div className="tableCard">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Total</th>
                    <th>Available</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "#94a3b8", padding: "30px" }}>
                        No equipment found. Click "+ Add Equipment" to get started.
                      </td>
                    </tr>
                  ) : (
                    equipment.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.totalQuantity}</td>
                        <td>{item.availableQuantity}</td>
                        <td>
                          <span className={`statusBadge ${item.availableQuantity > 0 ? "available" : "unavailable"}`}>
                            {item.availableQuantity > 0 ? "Available" : "Out of Stock"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BORROW PAGE */}
        {activePage === "borrow" && (
          <div>
            <h1 className="pageTitle">🔄 Borrow Records</h1>
            <p className="pageSub">Track all borrowing activity</p>
            <div className="tableCard">
              <p style={{ padding: "24px", color: "#94a3b8", textAlign: "center" }}>
                Borrow records will appear here from your API.
              </p>
            </div>
          </div>
        )}

        {/* USERS PAGE */}
        {activePage === "users" && (
          <div>
            <h1 className="pageTitle">👥 Users</h1>
            <p className="pageSub">All registered lab users</p>
            <div className="tableCard">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center", color: "#94a3b8", padding: "30px" }}>
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ── ADD EQUIPMENT MODAL ── */}
      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>

            <div className="modalHeader">
              <h2>➕ Add Equipment</h2>
              <button className="modalCloseBtn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modalBody">

              <div className="formGroup">
                <label>Equipment Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Microscope X200"
                  value={form.name}
                  onChange={handleFormChange}
                />
              </div>

              <div className="formGroup">
                <label>Category *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Optics, Biology, Chemistry"
                  value={form.category}
                  onChange={handleFormChange}
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label>Total Quantity *</label>
                  <input
                    type="number"
                    name="totalQuantity"
                    placeholder="e.g. 10"
                    value={form.totalQuantity}
                    onChange={handleFormChange}
                    min="1"
                  />
                </div>
                <div className="formGroup">
                  <label>Available Quantity *</label>
                  <input
                    type="number"
                    name="availableQuantity"
                    placeholder="e.g. 8"
                    value={form.availableQuantity}
                    onChange={handleFormChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="formGroup">
                <label>Description (optional)</label>
                <textarea
                  name="description"
                  placeholder="Brief description of the equipment..."
                  value={form.description}
                  onChange={handleFormChange}
                  rows="3"
                />
              </div>

              {formError && <p className="formError">{formError}</p>}

            </div>

            <div className="modalFooter">
              <button className="cancelBtn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="submitBtn" onClick={handleAddEquipment}>+ Add Equipment</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
