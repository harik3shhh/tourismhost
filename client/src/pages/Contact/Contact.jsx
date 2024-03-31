import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';

import {toast} from "react-toastify"
import { useAuth } from '../../context/auth';

const Contact = ({sidebar}) => {
  const [auth] = useAuth();
  const [user, setUser] = useState({
      name: `${auth?.user?.name || ""}`,
      email: `${auth?.user?.email || ""}`,
      message: "",
  });

  // Handling input
  const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setUser({
          ...user,
          [name]: value,
      });
  };

  
  // Handle submit
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('https://tourismhost-ubpc.vercel.app/api/auth/message', user);
      console.log(data); // Log the entire response data
      if (data?.success) {
        setUser({ name: '', email: '', message: '' });
        console.log('Message sent Successfull!');
        toast.success('Message Sent Successfull');
      } else {
        console.log(data?.message);
        toast.error('Message Failed to send');
      }
    } catch (error) {
      console.log(error);
      toast.error('Message failed to send');
    }
  };
  
  
  return (
    <>
    <Sidebar sidebar={sidebar}/>
    <div className="container">
    <div style={{ background: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '20px' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={user.name}
          onChange={handleInput}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={user.email}
          onChange={handleInput}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={user.message}
          onChange={handleInput}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        ></textarea>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Contact;
