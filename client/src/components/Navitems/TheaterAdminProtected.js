import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const TheaterAdminProtected = () => {
	const thisauth = localStorage.getItem("adminToken");
    return ( thisauth ) ? <Outlet /> : <Navigate to='/login' />

};

export default TheaterAdminProtected;