import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import { toast } from 'react-toastify';

const Profile = ({ sidebar }) => {
    const [auth, setAuth] = useAuth();

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
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

    useEffect(() => {
        if (auth?.user) {
            const { name, email, phone } = auth.user;
            setUser({
                ...user,
                name,
                email,
                phone,
            });
        }
    }, [auth?.user]);
    
    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `${auth.token}`,
                },
            };

            const { data } = await axios.put('https://tourismhost-ubpc.vercel.app/api/auth/profile', user, config);
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({
                    ...auth,
                    user: data?.updatedUser,
                });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    };

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleSubmit}>
                        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>USER PROFILE</h1>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={user.name}
                                onChange={handleInput}
                                style={{ borderRadius: '5px', width: '100%', padding: '8px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                disabled
                                style={{ borderRadius: '5px', width: '100%', padding: '8px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>Phone</label>
                            <input
                                type="phone"
                                className="form-control"
                                name="phone"
                                value={user.phone}
                                onChange={handleInput}
                                style={{ borderRadius: '5px', width: '100%', padding: '8px' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '3px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
