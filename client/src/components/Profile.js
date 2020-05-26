import React, { Component, Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ProfileAvatar from './ProfileAvatar';
import Wantlist from './Wantlist';
import Username from './Username';
import CollectionCount from './CollectionCount';
import WantlistCount from './WantlistCount';
import Modal from './Modal';
import { SpinnerCircular } from 'spinners-react';

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
    if(loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh' }}>
        <SpinnerCircular 
          size={50} 
          thickness={100} 
          speed={100}
          color="rgba(109, 122, 216, 1)"  
          secondaryColor="rgba(0, 0, 0, 0.44)" />
      </div>
    );
    
    const {
        username,
        num_collection,
        num_wantlist
    } = data.profile;

        return (
            <Fragment>
                <div className="discogs__profile--container" 
                 
                    >
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
                        data={data}
                        modalActive={modalActive} 
                        handleModalClose={handleModalClose} />
            </Fragment>
        )
}

export default Profile;
