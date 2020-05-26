import React, { Component, Fragment, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ToggleCount from "./ToggleCount";
import Results from "./Results";
import { SpinnerCircular } from 'spinners-react';

const WANTLIST_QUERY = gql`
  query WantlistQuery($page: Int!, $per_page: Int!) {
    wantlist(page: $page, per_page: $per_page) {
      wants {
        rating
        notes
        date_added
        basic_information {
          id
          title
          year
          thumb
          cover_image
          master_id
          resource_url
          artists {
            name
            anv
          }
          formats {
            descriptions
          }
          labels {
            name
            catno
          }
        }
      }
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
    }
  }
`;

const RELEASES_QUERY = gql`
    query ReleasesQuery($id : Int!) {
        releases(id: $id) {
            num_for_sale
            lowest_price
        }
    }   
`;

// Try combining query
// const DATA_QUERY = gql`
  
// `;

function Wantlist() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRelease, setfilteredRelease] = useState('');

    useEffect(() => {
      const newfilteredRelease = filteredRelease;
    }, [filteredRelease])
    
    const { loading, error, data: wantlistData, refetch, variables } = useQuery(WANTLIST_QUERY, {
      variables: { page: 1, per_page: 25 }
    });
    // const id = wantlistData && wantlistData.wantlist.wants.map((want) => want.basic_information.id);
    // console.log(id);

    // const { loading: loading2, data: releasesData } = useQuery(RELEASES_QUERY, {
    //     variables: { id: wantlistData && wantlistData.wantlist.wants.map((want) => want.basic_information.id)},
    //     skip: wantlistData == null
    // })
    // const { id = data.wantlist.wants.map( x => ( { id: x.basic_information.id } )) } = data;
    if (loading) return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh' }}>
        <SpinnerCircular 
          size={50} 
          thickness={100} 
          speed={100}
          color="rgba(109, 122, 216, 1)"  
          secondaryColor="rgba(0, 0, 0, 0.44)" />
      </div>
    );
    if (error) console.log(error);
    console.log(wantlistData);

    // const lessOne = wantlistData.wantlist.pagination.items-1;
    // const lessOneItem = lessOne.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // const doubled = wantlistData.wantlist.pagination.per_page+wantlistData.wantlist.pagination.per_page;
    // console.log(doubled)

    function handleSearch(e) {
      setSearchTerm(e.target.value);

      setfilteredRelease(wantlistData.wantlist.wants.filter((search) => {
        return search.basic_information.title === e.target.value
      }));    

    }

  return (
    <Fragment>
        <SearchBar
           handleSearch={handleSearch}
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           data={wantlistData}
           placeholder="Search Wantlist" />
        <ToggleCount 
          data={wantlistData} 
          refetch={refetch} />
        <Pagination 
          refetch={refetch} 
          data={wantlistData} />
        <Results
          filteredRelease={filteredRelease}
          data={wantlistData} />
      <div className="discogs__wantlist--bottom">
        <Pagination refetch={refetch} data={wantlistData} />
      </div>
    </Fragment>
  );
}

export default Wantlist;
