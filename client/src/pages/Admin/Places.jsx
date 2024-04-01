import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminMenu from '../../components/Layout/AdminMenu';
import Sidebar from '../../components/Sidebar/Sidebar';

const Places = ({ sidebar }) => {
    const [products, setProducts] = useState([]);

    //GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('https://tourismhost-ubpc.vercel.app/api/v1/place/get-place');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className="container">
                <AdminMenu/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ margin: '20px 0' }}>All Places List</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {products.map(p => (
                        <div key={p._id} style={{ margin: '10px', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', backgroundColor: '#fff', maxWidth: '300px' }}>
                            <Link to={`/dashboard/admin/place/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div>
                                    <img src={`https://tourismhost-ubpc.vercel.app/api/v1/place/place-photo/${p._id}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} alt={p.name} />
                                    <div style={{ padding: '10px' }}>
                                        <h5 style={{ marginBottom: '10px' }}>{p.name}</h5>
                                        <p>{p.description.substring(0, 30)}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    )
}

export default Places;
