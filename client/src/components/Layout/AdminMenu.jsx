// AdminMenu.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminMenu.css'; // Import the CSS file for styling

const AdminMenu = () => {
    return (
        <div className="admin-menu-container">
            <h2 className="admin-menu-heading">Admin Panel</h2>
            <div className="admin-menu-buttons">
                <NavLink to="/dashboard/admin/create-category" className="admin-menu-button" style={{background: "silver"}}>Create Category</NavLink>
                <NavLink to="/dashboard/admin/create-place" className="admin-menu-button" style={{background: "blue"}}>Create Place</NavLink>
                <NavLink to="/dashboard/admin/places" className="admin-menu-button" style={{background: "red"}}>Places</NavLink>
                <NavLink to="/dashboard/admin/allusers" className="admin-menu-button" style={{background: "green"}}>Users</NavLink>
            </div>
        </div>
    );
};

export default AdminMenu;
