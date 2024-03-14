import React, { useEffect, useState } from 'react'
import "./Feed.css"



// import { useAuth } from '../context/auth'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



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
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
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
      const { data } = await axios.get(`http://localhost:8000/api/v1/place/place-list/${page}`);
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
      const { data } = await axios.get("http://localhost:8000/api/v1/place/place-count");
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
      const { data } = await axios(`http://localhost:8000/api/v1/place/place-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (<>
    <div className="feed">
      {products?.map(p => (
        <Link to={`/place/${p.slug}`} className='card'>
          <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} height={"196px"} width={"290px"} alt="" />
          <h2>{p.name}</h2>
          <h3>{p.description.substring(0, 30)}</h3>
          {/* <p>100k likes &bull; 2 days ago</p> */}
          {/* <button className='btn btn-primary ms-1' onClick={() => navigate(`/place/${p.slug}`)}>More Details</button> */}
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