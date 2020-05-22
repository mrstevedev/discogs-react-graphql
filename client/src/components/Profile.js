import React, { Component, Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ProfileAvatar from './ProfileAvatar';
import Wantlist from './Wantlist';
import Username from './Username';
import CollectionCount from './CollectionCount';
import WantlistCount from './WantlistCount';
import Modal from './Modal';
// Set-up query 
const PROFILE_QUERY = gql`
    query ProfileQuery {
        profile {
            username
            num_collection
            num_wantlist
            avatar_url
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
                    <ProfileAvatar 
                        data={data} 
                        handleModalOpen={handleModalOpen} />
                    <Username 
                        username={username} />
                    <CollectionCount 
                        count={num_collection} />
                    <WantlistCount 
                        count={num_wantlist} />
                </div>
                    <Modal
                        modalActive={modalActive} 
                        handleModalClose={handleModalClose} />
            </Fragment>
        )
}

export default Profile;
