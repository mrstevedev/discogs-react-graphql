import React, { Component, useEffect, useState } from "react";
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Collection from "./components/Collection";
import Wantlist from "./components/Wantlist";
import About from './components/About';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:5000/graphql'
    })
});

function App() {

    const [active, setActive] = useState('');

    useEffect(() => {
        AOS.init();

        const activeState = localStorage.getItem('active');
        setActive( activeState );

        const navItem = document.querySelector(".main-nav-list a");

        if(localStorage.getItem('active') === null ){
            navItem.classList.add("active");
          }
    },[])
  
  return (
    <ApolloProvider client={ client }>
        <Router>
        <div className="container">
            <Header active={active} />
            <Route exact path="/" component={Profile} />
            <Route exact path="/collection" component={Collection} />
            <Route exact path="/wantlist" component={Wantlist} />
            <Route exact path="/about" component={About} />
            <Footer />
        </div>
        </Router>
    </ApolloProvider>
  );
}
export default App;
