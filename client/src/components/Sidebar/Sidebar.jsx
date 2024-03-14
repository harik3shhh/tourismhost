import React from 'react'
import "./Sidebar.css"
import home from "../../assets/home.png"
import gameIcon from "../../assets/game_icon.png"
import automobiles from "../../assets/automobiles.png"
import sports from "../../assets/sports.png"
import tech from "../../assets/tech.png"
import music from "../../assets/music.png"
import profileIcon from "../../assets/jack.png"
import { NavLink } from 'react-router-dom'
import insta from "../../assets/insta.png"
import linkedin from "../../assets/link.png"
import github from "../../assets/githubb.webp"



const Sidebar = ({sidebar}) => {
    
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
        <div className="sortcut-links">
            <div className="side-link" >
               <NavLink to="/"><img src={home} alt="" /></NavLink>
               
               <NavLink to="/"><p>Home</p></NavLink> 
            </div>

            <div className="side-link">
                <img src={gameIcon} alt="" /><p>Maps</p>
            </div>

            <div className="side-link">
                <img src={automobiles} alt="" /><p>Cabs</p>
            </div>

            <div className="side-link">
                <img src={sports} alt="" /><p>Flights</p>
            </div>

            <div className="side-link">
                <NavLink to="/trainbooking"><img src={tech} alt="" /></NavLink>
                <NavLink to="/trainbooking"><p>Train</p></NavLink>
            </div>

            <div className="side-link">
                <img src={music} alt="" /><p>Hotels</p>
            </div>

            <hr />

            <div className="side-link">
                <img src={music} alt="" /><p>About Us</p>
            </div>

            <div className="side-link">
                <NavLink to="/privacypolicy"><img src={music} alt="" /></NavLink>
                <NavLink to="/privacypolicy"><p>Privacy & Policy</p></NavLink>
            </div>

            
            <hr />
            
        </div>
        <div className="subscribed-list">
                <h3>Follow us on</h3>
                <div className="side-link">
                    <NavLink to={`https://www.instagram.com/userr.linux/`} target='_blank'><img src={insta} alt="" /></NavLink>
                    <NavLink to={`https://www.instagram.com/userr.linux/`} target='_blank'><p>Instagram</p></NavLink>
                </div>

                <div className="side-link">
                    <img src={linkedin} alt="" /><p>LinkedIn</p>
                </div>

                <div className="side-link">
                    <NavLink to={""} ><img src={github} alt="" /></NavLink><p>Github</p>
                </div>
            </div>
    </div>
  )
}

export default Sidebar