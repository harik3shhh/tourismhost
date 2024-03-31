import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../../context/auth";
import Sidebar from '../../components/Sidebar/Sidebar';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AdminMenu from '../../components/Layout/AdminMenu';


const Users = ({sidebar}) => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        }
      };

      const { data } = await axios.get("https://tourismhost-ubpc.vercel.app/api/auth/alluser", config);
      console.log(data);
      setUsers(data?.alluser)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUser();
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      console.log("Users updated:", users);
    }
  }, [users])

  const handleUpdate = (id) => {
    // Handle update logic here
    console.log("Update user with id:", id);
  }

  const handleDelete = async(id) => {
    // e.preventDefault();
    try {
      const config={
        headers: {
          Authorization: `${auth.token}`
        }
      };

      
      const {data} = await axios.delete(`https://tourismhost-ubpc.vercel.app/api/auth/delete-user/${id}`, config);
      if(data.success){
        toast.success(`User is Deleted`);
        
        getAllUser();
      }else{
        toast.error(data.message);

      }
    } catch (error) {
      toast.error("Something went wrong while Deleting");
    }
  }
  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className='container'>
        <AdminMenu/>
        <h2>USER DATA</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>Phone</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>{curUser.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>{curUser.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>{curUser.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', alignItems:"center", display: "flex", justifyContent:"center", verticalAlign: 'middle' }}>
                  <button
                    onClick={() => handleUpdate(curUser._id)}
                    style={{
                      marginRight: '35px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(curUser._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Users;
