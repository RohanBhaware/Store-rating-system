import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stores from "./pages/Stores";
import StoreDetails from "./pages/StoreDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddStore from "./pages/AddStore";
import AddOwner from "./pages/AddOwner";


import { AuthContext } from "./context/AuthContext";

/* ---------- PROTECTED ROUTE ---------- */
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <div style={{ padding: 20 }}>Access Denied</div>;
  }

  return children;
};

/* ---------- APP ---------- */
export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Stores />} />
        <Route path="/store/:id" element={<StoreDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Add Store (ADMIN ONLY) */}
        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddStore />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/add-owner"
  element={
    <ProtectedRoute roles={["admin"]}>
      <AddOwner />
    </ProtectedRoute>
  }
/>


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
