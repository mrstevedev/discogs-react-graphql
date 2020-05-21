import React from 'react';
import ReactImg from '../../public/img/React.png';
import NodejsImg from '../../public/img/Nodejs.png';
// import GraphQLImg from '../../public/img/GraphQLImg.svg';

function About() {
    return (
        <div>
            <p className="discogs__about--text">
                Full stack application with Reactjs, with useEffect, useState hooks, CSS3, BEM, ES6 Javascript, Nodejs, Express, Webpack, Babel, & GraphQL using the Discogs API.
            </p>
            <p>
                <img src={ ReactImg } />
                <img src={ NodejsImg } />
            </p>
        </div>
    )
}
export default About;