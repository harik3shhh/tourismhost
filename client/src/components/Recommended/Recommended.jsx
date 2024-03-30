// import React, { useEffect, useState } from 'react'
// import "./Recommended.css"
// import t1 from "../../assets/thumbnail1.png"
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// const Recommended = () => {

//     const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [page, setPage] = useState(1);

//   const getAllCategory = async () => {

//     try {
//       const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }

//     } catch (error) {
//       console.log(error);

//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//     getAllProducts()
//   }, [])

//   const getAllProducts = async () => {
//     try {
     
//       const { data } = await axios.get(`http://localhost:8000/api/v1/place/place-list/${page}`);
      
//       setProducts(data?.products)
//     } catch (error) {
      
//       console.log(error);

//     }
//   };

//   return (
//     <div className='recommended'>
//          {products?.slice(0,5).map(p => (
//         <Link to={`/place/${p.slug}`} className="side-video-list">
//             <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} alt="" />
//             <div className="vid-info">
//                 <h4>{p.name}</h4>
//                 <p>Jharkhand</p>
//                 <p>200k views</p>
//             </div>
//         </Link>
//         ))}

        
//     </div>
//   )
// }

// export default Recommended