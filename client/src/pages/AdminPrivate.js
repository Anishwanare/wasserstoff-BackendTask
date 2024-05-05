import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivate = () => {
  const AdminPrivateKey = localStorage.getItem("authAdminToken");
  return (
    <div>{AdminPrivateKey ? <Outlet /> : <Navigate to="/adminauth" />}</div>
  );
};

export default AdminPrivate;
