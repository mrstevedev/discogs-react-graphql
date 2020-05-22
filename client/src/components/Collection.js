import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames';
import Moment from 'react-moment';
import SideBar from './SearchBar';
import Pagination from './Pagination';

export const COLLECTION_QUERY = gql`
    query CollectionQuery($page: Int!, $per_page: Int!) {
        collection(page: $page, per_page: $per_page) {
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
    const { loading, error, data:collectionData, refetch, variables } = useQuery(COLLECTION_QUERY, {
        variables: { page: 1, per_page: 25 }
    });
    if(loading) return <h4>Loading..</h4>;
    if(error) console.log(error);
    console.log(collectionData);
    console.log(variables);
    const lessOnePage = collectionData.collection.pagination.pages-1;
    return (
        <Fragment>
           <SideBar data={collectionData} placeholder="Search Collection" />
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
            <Pagination refetch={refetch} data={collectionData} />
        <div className="discogs__collection--container">            
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
        <div className="discogs__wantlist--bottom">
           <Pagination refetch={refetch} data={collectionData} />
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
    </Fragment>
    )
}

export default Collection
