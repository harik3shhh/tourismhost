import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';


const Profile = () => {
    const [auth, setAuth] = useAuth();



    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",


    });

    //handling input
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    useEffect(() => {
        const { name, email, phone } = auth.user;
        setUser({
            ...user,
            name,
            email,
            phone,

        });
    }, [auth?.user])


    // handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);


        try {

            const config = {
                headers: {
                    Authorization: `${auth.token}`
                }
            };

            const { data } = await axios.put("http://localhost:8000/api/auth/profile", user, config);
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({
                    ...auth,
                    user: data?.updatedUser
                });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }


    };

    return (
        <>
            <div className=" container container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-9">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <h1 className='heading'>USER PROFILE</h1>
                                <div className="mb-3">
                                    <input type="text" className="form-control" name="name" placeholder='Name'
                                        value={user.name} onChange={handleInput}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input type="email" className="form-control" name="email" placeholder='Email Address'
                                        value={user.email} onChange={handleInput}
                                        disabled
                                    />
                                </div>
                                
                                <div className="mb-3">

                                    <input type="phone" className="form-control" name="phone" placeholder='+91'
                                        value={user.phone} onChange={handleInput}
                                    />

                                </div>

                                <button type="submit" className="btn btn-primary ">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile