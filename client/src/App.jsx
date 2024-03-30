import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login/Login'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register/Register'
import AdminRoute from './routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Dashboard from './pages/User/Dashboard'
import PrivateRoute from './routes/Private'
import Profile from './pages/User/Profile'
import CreateCategory from './pages/Admin/CreateCategory'
import CreatePlace from './pages/Admin/CreatePlace'
import Places from './pages/Admin/Places'
import UpdatePlace from './pages/Admin/UpdatePlace'
import PlaceDetails from './pages/PlaceDetails'
import Search from "./pages/Search"
import { useSelector } from "react-redux";
import Video from './pages/Video/Video'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TrainBooking from './pages/Bookings/TrainBooking'
import ForgotPassword from './pages/Auth/ForgotPassword'
import FlightBooking from './pages/Bookings/FlightBooking'
import Contact from './pages/Contact/Contact'
import WishlistPage from './pages/WishlistPage'
import Users from './pages/Admin/Users'
import AboutUs from './pages/Aboutus'




const App = () => {

  const [sidebar, setSidebar] = useState(true);
  const { theme } = useSelector((state)=> state.theme);
  console.log(theme);

  return (
    <div >
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy sidebar={sidebar}/>}/>
        <Route path='/trainbooking' element={<TrainBooking sidebar={sidebar}/>}/>
        <Route path='/flightbooking' element={<FlightBooking sidebar={sidebar}/>}/>
        <Route path='/wishlist' element={<WishlistPage sidebar={sidebar}/>}/>


        <Route path='/place/:slug' element={<Video />}/>
        <Route path='/profile' element={<Profile sidebar={sidebar}/>} />
        <Route path='/place/:slug' element={<PlaceDetails sidebar={sidebar} />} />
        <Route path='/search' element={<Search sidebar={sidebar}/>} />
        

        {/* USER */}
        <Route path='/dashboard' element={<PrivateRoute />} > 
             <Route path='user' element={<Dashboard sidebar={sidebar} />} />
        </Route>

          {/* ADMIN */}
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route exact path='admin' element={<AdminDashboard sidebar={sidebar}/>} />
          <Route path='admin/create-category' element={<CreateCategory sidebar={sidebar}/>} />
          <Route path='admin/create-place' element={<CreatePlace sidebar={sidebar}/>} />
          <Route path='admin/places' element={<Places sidebar={sidebar}/>} />
          <Route path='admin/place/:slug' element={<UpdatePlace sidebar={sidebar}/>} />
          <Route path='admin/allusers' element ={<Users sidebar={sidebar}/>}/>
        </Route>

        <Route path='/login' element={<Login sidebar={sidebar}/>}/>
        <Route path='/register' element={<Register sidebar={sidebar}/>}/>
        <Route path='/forgot-password' element={<ForgotPassword sidebar={sidebar}/>} />
        <Route path='/contact' element={<Contact sidebar={sidebar} />} />
        <Route path='/about' element={<AboutUs sidebar={sidebar}/>}/>

        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

export default App