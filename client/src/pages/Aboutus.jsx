import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const AboutUs = ({sidebar}) => {
  return (
    <>
    <Sidebar sidebar={sidebar}/>
    <div className='container' >
    
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: "#f9f9f9" }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About Us</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Welcome to Indian Tourism, your ultimate destination for all things travel! We are passionate about exploring the world and helping you create unforgettable travel experiences.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        At Indian Tourism, we believe that travel is not just about visiting new places, but also about creating meaningful connections, experiencing different cultures, and expanding your horizons. Whether you're a solo traveler looking for adventure, a couple seeking a romantic getaway, or a family planning a fun-filled vacation, we've got you covered.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Our team of travel experts is dedicated to providing you with personalized travel recommendations, insider tips, and expert advice to make your journey truly unforgettable. From exotic beach resorts to thrilling mountain adventures, we'll help you find the perfect destination for your next trip.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Join us on a journey of discovery and let Indian Tourism be your guide to the world's most amazing destinations. Start planning your next adventure with us today!
      </p>
    </div>
    </div>
    </>
  );
}

export default AboutUs;
