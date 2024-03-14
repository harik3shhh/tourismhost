import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import AdminMenu from '../../components/Layout/AdminMenu'

const AdminDashboard = ({sidebar}) => {
  return (
    <>
    <Sidebar sidebar={sidebar}/>
    <div className="container">
    <h1>Admin Dashboard</h1>
    <hr />
    <AdminMenu/>
    </div>
    </>
  )
}

export default AdminDashboard