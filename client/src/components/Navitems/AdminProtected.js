import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtected = () => {
	const auth = localStorage.getItem("adminToken");
    return ( auth ) ? <Outlet /> : <Navigate to='/login' />

};

export default AdminProtected;