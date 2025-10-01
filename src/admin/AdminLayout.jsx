import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Products", path: "/admin/products", icon: "🛍️" },
    { name: "Orders", path: "/admin/orders", icon: "📦" },
    { name: "Customers", path: "/admin/customers", icon: "👥" },
    { name: "Analytics", path: "/admin/analytics", icon: "📈" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="logo">
          <h2>{sidebarOpen ? "Admin Panel" : "AP"}</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>
        <nav className="menu">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  <span className="icon">{item.icon}</span>
                  {sidebarOpen && <span className="text">{item.name}</span>}
                </Link>
              </li>
            ))}
            <li className="spacer"></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                <span className="icon">🚪</span>
                {sidebarOpen && <span className="text">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
