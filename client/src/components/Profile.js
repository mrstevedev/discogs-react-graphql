import React, { Component, Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


// Set-up query 
const PROFILE_QUERY = gql`
    query ProfileQuery {
        profile {
            username
            num_collection
            num_wantlist
        }
    }
`;

function Profile() {
    const [ modalActive, setModalActive ] = useState(false);

    function handleModalOpen() {
       setModalActive(true);
    }

    function handleModalClose() {
       setModalActive(false);
    }

    const { loading, error, data } = useQuery(PROFILE_QUERY);
    if(loading) return <h4>Loading..</h4>;
    
    const {
        username,
        num_collection,
        num_wantlist
    } = data.profile;

        return (
            <Fragment>
                <div className="discogs__profile--container" 
                    data-aos="fade-in" 
                    data-aos-delay="100"
                    data-aos-duration="10"
                    data-aos-easing="ease-in-out">
                    <a href="#" onClick={handleModalOpen}>
                        <div className="discogs__profile--img"></div>
                    </a>
                    <div className="discogs__profile--username">
                    <h1>{username}</h1>
                    </div>
                    <div className="discogs__profile--section">
                        <h1 className="discogs__profile--header">Collection</h1>
                        <span className="discogs__profile--sub">{ num_collection.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span>
                    </div>
                    <div className="discogs__profile--section">
                        <h1 className="discogs__profile--header">Wantlist</h1>
                        <span className="discogs__profile--sub">{ num_wantlist.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span>

                    </div>
                </div>
                <div className={`overlay ${modalActive ? 'show': ''}`}>
                    <div className="modal-close">
                        <a href="#" onClick={handleModalClose}>Close</a>
                    </div>
                    <div className="modal">
                        <img src="../../public/img/joehenderson.jpg" />

                        <div>
                            <a href="#" onClick={handleModalClose}>Close</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
}

export default Profile;
