import React from 'react';
import ReactjsLogo from '../../public/img/React-icon.svg';
import NodejsLogo from '../../public/img/Nodejs-logo.svg';
import GraphQLimg from '../../public/img/GraphQL-logo.svg';

function About() {
    return (
        <div>
            <p className="discogs__about--text">
                Full stack application with Reactjs, with useEffect, useState hooks, CSS3, BEM, ES6 Javascript, Nodejs, Express, Webpack, Babel, & GraphQL using the Discogs API.
            </p>
            <p style={{ display: 'flex' }}>
                <img src={ ReactjsLogo } style={{ margin: '0 0.5rem' }} />
                <img src={ NodejsLogo } style={{ margin: '0 0.5rem' }} />
                <img src={ GraphQLimg } style={{ margin: '0 0.5rem' }} />
            </p>
        </div>
    )
}
export default About;