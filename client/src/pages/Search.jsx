import React from 'react'

import { useSearch } from '../context/Search'
import { Link } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No Places Found" : `Found ${values?.results.length} Places`}</h6>

                    <div className="d-flex flex-wrap">

                        {values?.results.map(p => (
                            <Link to={`/place/${p.slug}`} className="card m-2" style={{ width: "18rem" }} >
                                <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`}  class="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    
                                    {/* <button className='btn btn-primary ms-1'>More Details</button>
                                    <button className='btn btn-secondary ms-1'>Wishlist</button> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search