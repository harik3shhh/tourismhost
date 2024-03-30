import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlaceDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    // initial details
    useEffect(() => {
        if(params?.slug) getProduct();
    }, [params?.slug])

    // GET PRODUCTS
    const getProduct = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/place/get-place/${params.slug}`);        
            setProduct(data?.product);
           
        } catch (error) {
            console.log(error);
        }
    };




  return (
    <>
      <div className="row container mt-2">
        <div className="col-md-6">
            <img src={`http://localhost:8000/api/v1/place/place-photo/${product._id}`}
             alt={product.name} height={"200px"} width={'320px'} />
        </div>
        <div className="col-md-6">
          <h1 className='text-center'>Place Details</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            
            <h6>Category: {product?.category?.name}</h6>
            <button className='btn btn-secondary'>❤️</button>
        </div>
      </div>
      <hr />
     
    </>
  )
}

export default PlaceDetails