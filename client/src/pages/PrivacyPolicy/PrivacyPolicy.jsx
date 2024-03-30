import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./PrivacyPolicy.css"

const PrivacyPolicy = ({sidebar}) => {
    return (
        <>
        <Sidebar sidebar={sidebar}/> 
        <div className="container">
        <div className='privacy-policy-container'>
            <h1 className='privacy-policy-heading'>Privacy Policy</h1>
            <p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, [your website URL], and other sites we own and operate.</p>
            
            <div className='privacy-policy-section'>
                <h2 className='privacy-policy-section-title'>1. Information we collect</h2>
                <p>We only collect information about you if we have a reason to do so - for example, to provide our services, to communicate with you, or to make our services better.</p>
            </div>
            
            <div className='privacy-policy-section'>
                <h2 className='privacy-policy-section-title'>2. How we use your information</h2>
                <p>We use the information we collect in various ways, including to:</p>
                <ul className='privacy-policy-list'>
                    <li className='privacy-policy-list-item'>Provide, operate, and maintain our website</li>
                    <li className='privacy-policy-list-item'>Improve, personalize, and expand our website</li>
                    <li className='privacy-policy-list-item'>Understand and analyze how you use our website</li>
                </ul>
            </div>

            {/* Add more sections as needed */}

        </div>
        </div>
        </>
    );
};

export default PrivacyPolicy;
