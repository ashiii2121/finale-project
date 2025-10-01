import React from "react";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  // In a real application, you would check authentication with a backend
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminGuard;
