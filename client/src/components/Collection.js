import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames';
import Moment from 'react-moment';

export const COLLECTION_QUERY = gql`
    query CollectionQuery($per_page: Int!) {
        collection(per_page: $per_page) {
            pagination {
                per_page
                items
                page
                urls {
                    last
                    next
                }
                pages
            }
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
    const [ perPage, setPerPage ] = useState(50);

    const { loading, error, data:collectionData, refetch, variables } = useQuery(COLLECTION_QUERY, {
        variables: { per_page: perPage }
    });
    if(loading) return <h4>Loading..</h4>;
    if(error) console.log(error);
    console.log(collectionData);
    const {
        date_added,
        basic_information,
        artists
    } = collectionData.collection.releases
    
    return (
        <div className="discogs__collection--container">
            <div>
            <form className="discogs__wantlist--search-form">
            <input className="discogs__wantlist--searchInput" type="text" placeholder="Search Collection"
            />
            <svg fill="#ccc" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
            </svg>
            </form>
            <div className="discogs__wantlist--toggle-options">
                <div className="discogs__wantlist--toggle-select">
                    <select value={ collectionData.collection.pagination.per_page } onChange={(event) => refetch( { per_page: parseInt(event.target.value) } )}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="125">125</option>
                    </select>
                </div>
                <div className="discogs__wantlist--toggle-btns">

                </div>
            </div>
            </div>
            { collectionData.collection.releases.map( release => (
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
