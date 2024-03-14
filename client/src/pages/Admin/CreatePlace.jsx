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

    // GET ALL CATEGORY
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/category/get-category');
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

            const { data } = await axios.post('http://localhost:8000/api/v1/place/create-place', productData);
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
                                placeholder="select a category"
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
                                <label style={{background: "pink"}}>
                                    {photo ? photo.name : 'Upload Image'}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
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
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    cols="30"
                                    rows="4"
                                    value={description}
                                    placeholder="description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <button className="" onClick={handleSubmit}>
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
