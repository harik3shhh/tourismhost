import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import "./PlayVideo.css"
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"



const PlayVideo = () => {
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
    <div className='play-video'>
        <video src={video1} controls autoPlay muted></video>
        <h3>{product.name}</h3>
        <div className="play-video-info">
            <p>15225 Views &bull; 2 days ago</p>
            <div>
                <span><img src={like} alt="" />125</span>
                <span><img src={dislike} alt="" />125</span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={jack} alt="" />
            <div>
                <p>Description</p>
                <span></span>
            </div>
            <button>Follow</button>
        </div>
        <div className="vid-description">
            <p>{product.description}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, libero tenetur hic harum veniam labore enim vitae sed cupiditate eos!</p>
            <hr />
            <h4>130 Comments</h4>
            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>harikesh <span>1 day ago</span></h3>
                    <p>This is awsome. I loved it</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
                </div>
        </div>
    </div>
  )
}

export default PlayVideo