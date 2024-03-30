import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminMenu from '../../components/Layout/AdminMenu';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./Places.css";

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
            <div className="container places-container">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="places-title">All Places List</h1>
                        <div className="places-grid">
                            {products.map(p => (
                                <div key={p._id} className="places-item">
                                    <Link to={`/dashboard/admin/place/${p.slug}`} className="places-link">
                                        <div className="places-card">
                                            <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} className="places-card-image" alt={p.name} />
                                            <div className="places-card-body">
                                                <h5 className="places-card-title">{p.name}</h5>
                                                <p className="places-card-description">{p.description.substring(0, 30)}</p>
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
