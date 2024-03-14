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



const App = () => {
  const [sidebar, setSidebar] = useState(false);
  const { theme } = useSelector((state)=> state.theme);
  console.log(theme);

  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
        <Route path='/trainbooking' element={<TrainBooking/>}/>


        <Route path='/place/:slug' element={<Video />}/>
        <Route path='/profile' element={<Profile sidebar={sidebar}/>} />
        <Route path='/place/:slug' element={<PlaceDetails />} />
        <Route path='/search' element={<Search />} />
        

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
        </Route>

        <Route path='/login' element={<Login sidebar={sidebar}/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

export default App