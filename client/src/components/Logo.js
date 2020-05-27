import React, { Fragment } from 'react';
import ProfileLogo from '../../public/img/discogs-logo.svg';

function Logo() {
    return (
        <div className="discogs--logo">
            <img src={ ProfileLogo } />
        </div>
    )
}
export default Logo;