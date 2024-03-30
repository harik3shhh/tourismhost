import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./PlayVideo.css"
import video1 from "../../assets/beach.mp4"
import profileIcon from "../../assets/bluepic.png";
import jack from "../../assets/jack.png"
import { useCart } from '../../context/wishlist';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';



const PlayVideo = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [auth] = useAuth();

    // initial details
    useEffect(() => {
        if(params?.slug) getProduct();
    }, [params?.slug])

    // GET PRODUCTS
    const getProduct = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/place/get-place/${params.slug}`);        
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
        }
    };

    // GET SIMILAR PRODUCT
    const getSimilarProduct = async(pid, cid) =>{
      try {
        const {data} = await axios.get(`http://localhost:8000/api/v1/place/related-place/${pid}/${cid}`);
        setRelatedProducts(data?.data.products);
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <div className=' play-video'>
        <video src={video1} controls autoPlay loop muted></video>
       
        <div style={{ float: "right", marginRight: "20px", flexBasis: "90%" }}>
            <img 
                src={`http://localhost:8000/api/v1/place/place-photo/${product._id}`}
                alt={product.name}  
                height={"250px"} 
                width={'400px'} 
            />
            <h2 style={{textAlign: "center", fontSize: "35px"}}>{product.name}</h2>
            <hr />
        
            <div style={{marginBottom: "9.5px", display: "flex"}}><h4>Food :</h4><span>{ product.food}</span></div>

            <div style={{marginBottom: "9.5px", display: "flex"}}><h4>Transport :</h4><span>{product.transport}</span></div>

            <div style={{marginBottom: "9.5px", display: "flex"}}><h4>Nearby Places :</h4><span>{product.nearby}</span></div>
            
            <div style={{marginBottom: "9.5px", display: "flex"}}><h4>Location :</h4><span>{product.location}</span></div>

            <div style={{marginBottom: "9.5px", display: "flex"}}><h4>Best time to visit :</h4><span>{product.besttime}</span></div>
        </div>

            <h3>Trailer - {product.name}</h3>
      
        <hr />
        <div className="publisher">
            <img src={profileIcon} alt="" />
            <div>
                <p>Description</p>
                <span></span>
            </div>
            {
                !auth.user ?(
                <>
                    
                </>
            ) : (   
            <button style={{marginRight: "10px"}} onClick={() =>{setCart([...cart, product])
                    localStorage.setItem("cart", JSON.stringify([...cart, product]))
                    toast.success("Place Added to Wishlist")
                }}>Add to Wishlist</button>
                
                )}
                <NavLink to={"/trainbooking"}><button style={{background:"blue"}}>Book Train</button></NavLink>
                <NavLink to={"/flightbooking"}><button style={{background:"orange"}}>Book Flight</button></NavLink>
                </div>
        <div className="vid-description">
            <p>{product.description}</p>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, libero tenetur hic harum veniam labore enim vitae sed cupiditate eos!</p> */}
            <hr />
            
        </div>
    </div>
  )
}

export default PlayVideo