import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import indiabanner from "../../assets/banner2.png"
import advert from "../../assets/adv4.jpg"
import adv2 from "../../assets/adv2.jpg"
import "./Feed.css"



const Feed = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();


  // GET CATEGORY
  const getAllCategory = async () => {

    try {
      const { data } = await axios.get("https://tourismhost-ubpc.vercel.app/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }

    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts()
  }, [])


  // GET PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`https://tourismhost-ubpc.vercel.app/api/v1/place/place-list/${page}`);
      setLoading(false);
      // console.log(data);
      setProducts(data?.products)
    } catch (error) {
      setLoading(false)
      console.log(error);

    }
  };

  // GET TOTAL COUNT
  // GET TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://tourismhost-ubpc.vercel.app/api/v1/place/place-count");
      console.log(data);
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])

  // LoadMore function
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios(`https://tourismhost-ubpc.vercel.app/api/v1/place/place-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (<>
      <div>
      <img style={{borderRadius: "60px", marginLeft: "30px"}} src={indiabanner} alt="banner" height={"400px"} width={"95%"}/>
      </div>

      
      <h2 style={{textAlign: "center", fontWeight: "bolder", marginBottom:"10px"}}>🚅 Explore. Dream. Discover. </h2><br />
      <div style={{display: "flex", justifyContent: "center"}}>
      <img src={adv2} alt="" width={"45%"} height={"90px"} style={{marginRight:"5px"}}/>
      <img src={advert} alt="" height={"90px"} width={"45%"}/>
      </div><br />
      <hr />
    <div className="feed">
   
      {products?.map(p => (
        <Link to={`/place/${p.slug}`} className='card'>
          <img src={`https://tourismhost-ubpc.vercel.app/api/v1/place/place-photo/${p._id}`} height={"196px"} width={"290px"} alt="" />
          <h2>{p.name}</h2>
          <h3>{p.description.substring(0, 30)}</h3>
        </Link>
      ))}
    </div>

    <div className='btn-center'>
      {products && products.length < total && (
        <button className='loadingbtn' onClick={(e) => {
          e.preventDefault();
          setPage(page + 1);
        }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  </>
  )
}

export default Feed
