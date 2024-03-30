import React from 'react'
import "./Sidebar.css"
import home from "../../assets/home.png"
import gameIcon from "../../assets/game_icon.png"
import music from "../../assets/music.png"
import { NavLink } from 'react-router-dom'
import insta from "../../assets/insta.png"
import linkedin from "../../assets/link.png"
import github from "../../assets/githubb.webp"
import train from "../../assets/trainlogo.png"
import carlogo from "../../assets/carlogo.png"
import flightlogo from "../../assets/flightlogo.jpg"
import hotelslogo from "../../assets/hotelslogo.png"
import mapslogo from "../../assets/mapslogo.jpg"
import aboutus from "../../assets/aboutus.png"
import privacy from "../../assets/privacy.png"



const Sidebar = ({sidebar}) => {
    
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
        <div className="sortcut-links">
            <div className="side-link" >
               <NavLink to="/"><img src={home} alt="" /></NavLink>
               
               <NavLink to="/"><p>Home</p></NavLink> 
            </div>

            <div className="side-link">
                <img src={mapslogo} alt="" /><p>Maps</p>
            </div>

            <div className="side-link">
                <img src={carlogo} alt="" /><p>Cabs</p>
            </div>

            <div className="side-link">
                <NavLink to="/flightbooking"><img src={flightlogo} alt="" /></NavLink>
                <NavLink to="/flightbooking"><p>Flights</p></NavLink>
            </div>

            <div className="side-link">
                <NavLink to="/trainbooking"><img src={train} alt="" /></NavLink>
                <NavLink to="/trainbooking"><p>Trains</p></NavLink>
            </div>

            <div className="side-link">
                <img src={hotelslogo} alt="" /><p>Hotels</p>
            </div>

            <hr />

            <div className="side-link">
                <NavLink to="/about"><img src={aboutus} alt="" /></NavLink>
                <NavLink to="/about"><p>About Us</p></NavLink>
            </div>

            <div className="side-link">
                <NavLink to="/privacypolicy"><img src={privacy} alt="" /></NavLink>
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
                    <NavLink to={`https://www.instagram.com/userr.linux/`} target='_blank'><img src={linkedin} alt="" /></NavLink>
                    <NavLink to={`https://www.linkedin.com/in/harikesh-yadav/`} target='_blank'><p>Linked In</p></NavLink>
                </div>

               <div className="side-link">
                    <NavLink to={`https://www.instagram.com/userr.linux/`} target='_blank'><img src={github} alt="" /></NavLink>
                    <NavLink to={`https://github.com/harik3shhh`} target='_blank'><p>Github</p></NavLink>
                </div>
            </div>
    </div>
  )
}

export default Sidebar