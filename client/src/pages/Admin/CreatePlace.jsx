import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import AdminMenu from '../../components/Layout/AdminMenu';

const { Option } = Select;

const CreatePlace = ({ sidebar }) => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [food, setFood] = useState('');
    const [transport, setTransport] = useState('');
    const [nearby, setNearby] = useState('');
    const [location, setLocation] = useState('');
    const [besttime, setBesttime] = useState('');

    // GET ALL CATEGORY
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('https://tourismhost-ubpc.vercel.app/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // handlesubmit create product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append('category', category);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('photo', photo);
            productData.append('food', food);
            productData.append('transport', transport);
            productData.append('nearby', nearby);
            productData.append('location', location);
            productData.append('besttime', besttime);

            const { data } = await axios.post('https://tourismhost-ubpc.vercel.app/api/v1/place/create-place', productData);
            if (data?.success) {
                toast.success('Product Created Successfully');
                navigate('/dashboard/admin/places');
            } else {
                toast.error('Failed to Create Place');
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong while creating Place');
        }
    };

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className="container container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Place</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            {/* UPLOAD IMAGE */}
                            <div className="mb-3">
                                <label htmlFor="upload-btn" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                                    {photo ? photo.name : 'Upload Image'}
                                </label>
                                <input
                                    type="file"
                                    id="upload-btn"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </div>

                            {/* IMAGE PREVIEW */}
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="photo to upload"
                                            height="200px"
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    cols="30"
                                    rows="4"
                                    value={description}
                                    placeholder="Description"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={food}
                                    placeholder="Enter food"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setFood(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={transport}
                                    placeholder="Enter Transport"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setTransport(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={nearby}
                                    placeholder="Enter Nearby Places"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setNearby(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={location}
                                    placeholder="Enter Location"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={besttime}
                                    placeholder="Enter best time to visit"
                                    className="form-control"
                                    style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    onChange={(e) => setBesttime(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                            <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' }}
                                >
                                    CREATE PLACE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePlace;
