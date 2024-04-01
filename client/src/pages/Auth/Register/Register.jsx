import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

const Register = ({ sidebar }) => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: '',
        phone: "",
        password: '',
        answer: "",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:8000/api/auth/register', input);
            if (data?.success) {
                setInput({ name: "", email: "", phone: "", answer: "", password: "", });
                console.log('Registration Successful!');
                toast.success("Registration Successful");
                navigate("/login")
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    const [text] = useTypewriter({
        words: ['Beautiful Destinations.', 'Travelling India.'],
        loop: {},
    });

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <h2 style={{ textAlign: "center" }}>Register</h2>
                        <br />
                        <hr />
                        <div className="text-content">
                            <div className="text-content-column">
                                <h2 >
                                    <span style={{ color: "blue" }}>{text}</span>
                                    <Cursor cursorColor='rgb(233, 225, 238)' />
                                </h2>
                                <h3>Travel anywhere. Travel anytime.</h3>
                                <h5>Ready for the Trip? Enter your email to Login or create an account.</h5>
                            </div>
                        </div>

                        <input type="text" placeholder="Enter Name" name="name" value={input.name} onChange={handleInput} />
                        <input type="email" placeholder="Email Address" name="email" value={input.email} onChange={handleInput} />
                        <input type="phone" placeholder="Phone" name="phone" value={input.phone} onChange={handleInput} />
                        <input type="text" placeholder="Enter Your Favourite Thing" name="answer" value={input.answer} onChange={handleInput} />
                        <input type="password" placeholder="Password" name="password" value={input.password} onChange={handleInput} />
                        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', border: 'none',  }}>Register</button>

                        <NavLink to={"/login"}><p style={{float: "right", marginTop:"5px", color: "blue"}}>Already have an account?</p></NavLink>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
