import React from 'react'
import "./Home.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'

// import Login from '../Auth/Login/Login'


const Home = ({sidebar}) => {
  

  return (
    <>
    <Sidebar sidebar={sidebar}/>
    
    <div  className={`container ${sidebar?"":"large-container"} hero`}>
        <Feed/>
      
        
    </div>
    </>
  )
}

export default Home