import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    function handleLinkActive(e, val) {
       localStorage.setItem('active', val);
       const active = document.querySelector('.active');
       if(active){
         active.classList.remove('active');
       }
       e.currentTarget.querySelector('.nav-link a').classList.add('active');        
    }
    return (
        <nav data-aos="fade-down">
            <ul className="main-nav-list">
                <li className="nav-link" onClick={(e) => handleLinkActive(e, 'profile')}><Link className={props.active === 'profile' ? 'active' : ''} to="/">Profile</Link></li>                    
                <li className="nav-link" onClick={(e) => handleLinkActive(e, 'collection')}><Link className={props.active === 'collection' ? 'active' : ''} to="/collection">Collection</Link></li>                    
                <li className="nav-link" onClick={(e) => handleLinkActive(e, 'wantlist')}><Link className={props.active === 'collection' ? 'active' : ''} to="/wantlist">Wantlist</Link></li>                    
                <li className="nav-link" onClick={(e) => handleLinkActive(e, 'about')}><Link className={props.active === 'about' ? 'active' : ''} to="/about">About</Link></li>                    
            </ul>
        </nav>
    )
}
export default Header;