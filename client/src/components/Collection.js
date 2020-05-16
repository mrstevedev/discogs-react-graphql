import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames';
import Moment from 'react-moment';

export const COLLECTION_QUERY = gql`
    query CollectionQuery  {
        collection {
            releases {
                date_added
                basic_information {
                    id
                    year
                    title
                    artists {
                        name
                    }
                    cover_image
                }
            }
        }
    }
`;

function Collection()  {
    const { loading, error, data } = useQuery(COLLECTION_QUERY);
    if(loading) return <h4>Loading..</h4>;
    if(error) console.log(error);
    console.log(data);
    const {
        date_added,
        basic_information,
        artists
    } = data.collection.releases
    
    return (
        <div className="discogs__collection--responseContainer">
            { data.collection.releases.map( release => (
                <div className="discogs__collection--img" key={ release.basic_information.id }>
                    <div className="discogs__collection--overlay">
                        <div className="discogs__collection--overlay-inner"> 
                            <p>{ release.basic_information.artists[0].name } - { release.basic_information.title }</p>
                            <p>Added to collection on <Moment format="MMMM DD, YYYY">{ release.date_added }</Moment></p>
                        </div>
                    </div>
                    <img src={ `${ release.basic_information.cover_image }` } />
                </div>
            )) }
        </div>
    )
}

export default Collection
