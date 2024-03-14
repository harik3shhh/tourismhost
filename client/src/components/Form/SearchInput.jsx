import React from 'react'
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchIcon from "../../assets/search.png"

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            const {data} = await axios.get(`http://localhost:8000/api/v1/place/search/${values.keyword}`)
            setValues({...values, results: data});
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='nav-middle flex-div'>
      <div className="search-box flex-div">
        
        <input type="search" placeholder="Search"
        value={values.keyword}
        onChange={(e)=> setValues({...values, keyword: e.target.value})} />
        <img type="submit" onClick={handleSubmit} src={SearchIcon} alt="" />
     
      </div>
    </div>
  )
}

export default SearchInput
