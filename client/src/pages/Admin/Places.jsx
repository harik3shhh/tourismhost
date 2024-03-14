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
            const { data } = await axios.get('http://localhost:8000/api/v1/place/get-place');
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
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Places List</h1>
                        <div className="row">
                            {products.map(p => (
                                <div key={p._id} className="col-md-4">
                                    <Link to={`/dashboard/admin/place/${p.slug}`} className="place-link">
                                        <div className="card m-2" style={{ width: '18rem' }}>
                                            <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Places;
