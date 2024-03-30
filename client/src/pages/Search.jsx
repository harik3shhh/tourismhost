import React from 'react';
import { useSearch } from '../context/Search';
import { Link } from 'react-router-dom';
import "./Search.css"
import Sidebar from '../components/Sidebar/Sidebar';

const Search = ({sidebar}) => {
    const [values, setValues] = useSearch();

    return (
        <>
        <Sidebar sidebar={sidebar}/>
        <div className="container search-container">
            <div className="search-text-center">
                <h1>Search Results</h1>
                <h4 style={{marginBottom:"10px"}}>{values?.results.length < 1 ? "No Places Found" : `Found ${values?.results.length} Places`} </h4>

                <div className="card-grid">
                    {values?.results.map((p, index) => (
                        <div key={p._id} className="custom-card">
                            <Link to={`/place/${p.slug}`} className="custom-card-link">
                                <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} className="custom-card-image" alt={p.name} />
                                <div className="custom-card-content">
                                    <h5 className="custom-card-title">{p.name}</h5>
                                    <p className="custom-card-description">{p.description.substring(0, 30)}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Search;
