// declare basic header
import React from 'react';
import reactLogo from '../assets/mybuhler-logo.png';
import './Header.css';

const Header = () => {

    const handleLogoClick = () => {
        window.location.href = '/search'
    }

    const handleHomeClick = () => {
        window.location.href = '/search'
    }

    return (
        <div className='header' style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex'}}>
                <img src={reactLogo} className='logo' alt="React Logo" onClick={handleLogoClick}/>
                <div className='home-tab' onClick={handleHomeClick}>Home</div>
            </div>
            <div style={{display: 'flex'}}>
                <div className='account-name'>username</div>
                <div className='account-picture'>PIC</div>
            </div>
        </div>
    );
};

export default Header;

