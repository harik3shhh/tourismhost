import React, { useState } from 'react';
import "./Navbar.css";
import menuIcon from "../../assets/menu.png";

import profileIcon from "../../assets/bluepic.png";
import dashboardimage from "../../assets/dashboardimage.webp"
import settingsPic from "../../assets/setting.png";
import helpPic from "../../assets/help.png";
import logoutPic from "../../assets/logout.png";
import userProfile from "../../assets/profile.png";
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import loginIcon from "../../assets/loginIcon.webp"
import registerIcon from "../../assets/registerIcon.jpeg"

import { useDispatch, useSelector } from 'react-redux';


const Navbar = ({ setSidebar, props} )  => {
  const { theme } = useSelector((state) => state.theme);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const dispatch = useDispatch();



  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful!!!");
  };

  return (
    <nav className={`flex-div`}>
      <div className="nav-left flex-div">
        <img src={menuIcon} className='menu-icon' onClick={() => setSidebar(prev => !prev)} alt="" />
        <NavLink to="/" style={{color:"#000"}}><h1>INDIAN TOUR🌴SM</h1></NavLink>
      </div>

      <SearchInput />

      <div className="nav-right flex-div">


        


       {/* <button onClick={() => handleTheme()}>
          {theme === "dark" ? <BsMoon /> : <BsSunFill />}
        </button>
        <img src={notificationIcon} alt="image" />` */}

        {/* PROFILE MENU */}
        <div className="profile-wrapper"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <img src={profileIcon} alt="" className="user-pic" />

          <div className={`sub-menu-wrap ${open ? 'active' : 'inactive'}`} id="subMenu">
            <div className="sub-menu">
              <div className="user-info">
                <img src={profileIcon} className='plogo' alt="" />
                <h2>{auth?.user?.name || "Guest"}</h2>
              </div>
              <hr />
              <NavLink to="/profile" className="sub-menu-link">
                <img src={userProfile} alt="image" />
                <p>Profile</p>
              </NavLink>

              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="sub-menu-link">
                <img src={dashboardimage} alt="image" />
                <p>Dashboard</p>
              </NavLink>


              <NavLink to="" className="sub-menu-link">
                <img src={settingsPic} alt="" />
                <p>Settings & Privacy</p>
              </NavLink>
              <NavLink to="/contact" className="sub-menu-link">
                <img src={helpPic} alt="" />
                <p>Help & Support</p>
              </NavLink>
              {
                !auth.user ? (
                  <>
                    <NavLink to="/login" className="sub-menu-link">
                      <img src={loginIcon} alt="logout" />
                      <p>Login</p>
                    </NavLink>
                    <NavLink to="/register" className="sub-menu-link">
                      <img src={registerIcon} alt="logout" />
                      <p>Register</p>
                    </NavLink>
                  </>
                ) : (
                  <NavLink className="sub-menu-link">
                    <img src={logoutPic} alt="logout" />
                    <p><NavLink onClick={handleLogout} to={"/"}>Logout</NavLink></p>
                  </NavLink>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
