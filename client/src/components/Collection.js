import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ToggleCount from './ToggleCount';
import Results from './Results';
import { SpinnerCircular } from 'spinners-react';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRelease, setfilteredRelease] = useState('');

    useEffect(() => {
        const newfilteredRelease = filteredRelease;
    }, [filteredRelease])

    const { loading, error, data:collectionData, refetch, variables } = useQuery(COLLECTION_QUERY, {
        variables: { page: 1, per_page: 25 }
    });
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
    if(error) console.log(error);
    console.log(collectionData);

function handleSearch(e) {
    const splitStr = e.target.value.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    const joinStr = splitStr.join(' ');
    console.log(joinStr);
    setSearchTerm(e.target.value);

    setfilteredRelease(collectionData.collection.releases.filter((search) => {
        return search.basic_information.title === joinStr
    }));    
}

    return (
        <Fragment>
            <SearchBar 
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                data={collectionData} 
                placeholder="Search Collection" />
            <ToggleCount 
                refetch={refetch} 
                data={collectionData} />
            <Pagination 
                refetch={refetch} 
                data={collectionData} />
            <Results
                filteredRelease={filteredRelease}
                data={collectionData} />
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
