import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

// Create Category Login
const CategoryForm = () => {
    const [auth] = useAuth();
    const [place, setPlace] = useState({
        name: '',
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setPlace({
            ...place,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'https://tourismhost-ubpc.vercel.app/api/v1/category/create-category';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${auth.token}`,
                },
                body: JSON.stringify(place),
            });

            const data = await res.json();
            if (res && res.ok) {
                setPlace({ name: '' });
                toast.success(`New Category ${place.name} is Created!!!`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <div className="mb-3">
                    <input
                        type="text"
                        style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            width: '300px',
                            marginTop: "10px",
                            outline: "0"
                        }}
                        placeholder="Enter New Category"
                        name="name"
                        value={place.name}
                        onChange={handleInput}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        marginTop: '10px',
                        padding: '10px 10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: "15px",
                        fontWeight: "600"
                    }}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
