import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user && !user.isAdmin) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
