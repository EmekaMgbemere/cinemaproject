import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const CinemaProtected = () => {
	const auth = localStorage.getItem("adminToken");
    return ( auth ) ? <Outlet /> : <Navigate to='/login' />

};

export default CinemaProtected;