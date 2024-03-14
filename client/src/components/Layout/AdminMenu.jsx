import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminMenu.css' // Import the CSS file for styling

const AdminMenu = () => {
    return (
        <div className="admin-menu-container">
            
            <h2 className="admin-menu-heading">Admin Panel</h2>
            <div className="list-group">
                <NavLink to="/dashboard/admin/create-category" className="adminmenu-list"><button style={{background: "orange"}}>Create Category</button></NavLink>
                <NavLink to="/dashboard/admin/create-place" className="adminmenu-list"><button style={{background: "blue"}}>Create Place</button></NavLink>
                <NavLink to="/dashboard/admin/places" className="adminmenu-list"><button style={{background: "red"}}>Places</button></NavLink>
                <NavLink to="/dashboard/admin/users" className="adminmenu-list"><button style={{background: "green"}}>Users</button></NavLink>
            </div>
        </div>
    )
}

export default AdminMenu
