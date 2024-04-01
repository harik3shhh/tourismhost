import React from 'react';
import { useSearch } from '../context/Search';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const Search = ({ sidebar }) => {
    const [values, setValues] = useSearch();

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className="container search-container">
                <div className="search-text-center">
                    <h1>Search Results</h1>
                    <h4 style={{ marginBottom: "10px" }}>{values?.results.length < 1 ? "No Places Found" : `Found ${values?.results.length} Places`} </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {values?.results.map((p, index) => (
                            <div key={p._id} style={{ backgroundColor: '#fff', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
                                <Link to={`/place/${p.slug}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none', transformOrigin: 'center' }} 
                                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }} 
                                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
                                    <img src={`https://tourismhost-ubpc.vercel.app/api/v1/place/place-photo/${p._id}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} alt={p.name} />
                                    <div style={{ padding: '20px' }}>
                                        <h5 style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{p.name}</h5>
                                        <p style={{ fontSize: '0.9rem', color: '#555' }}>{p.description.substring(0, 30)}</p>
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
