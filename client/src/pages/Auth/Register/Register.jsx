import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';

const Register = ({sidebar}) => {
    const navigate = useNavigate();
    // const location = useLocation();

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
            const { data } = await axios.post('https://tourismhost-ubpc.vercel.app/api/auth/register', input);
            if (data?.success) {
                setInput({name:"", email: "", phone:"", answer: "", password: "",});
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
    

    return (
        <>
        <Sidebar sidebar={sidebar} />
            <div className="content">
                <div className="body flex column a-center j-center">
                    <div className="text flex column" >
                        <h1>Beautiful Destinations, Travelling India.</h1>
                        <h4>Travel anywhere. Travel anytime.</h4>
                        <h6>Ready to Travel? Enter your email to Login or create an account.</h6>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form">

                        <input type="text" placeholder="Enter Name" name="name" value={input.name} onChange={handleInput} />

                        <input type="email" placeholder="Email Address" name="email" value={input.email} onChange={handleInput} />

                        <input type="phone" placeholder="Phone" name="phone" value={input.phone} onChange={handleInput} />

                        <input type="text" placeholder="Enter Your Favourite Thing" name="answer" value={input.answer} onChange={handleInput} />

                        <input type="password" placeholder="Password" name="password" value={input.password} onChange={handleInput} />

                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
