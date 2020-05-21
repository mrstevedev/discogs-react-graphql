import React, { Component, Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SearchBar from './SearchBar';

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
    if (loading) return <h4>Loading..</h4>;
    if (error) console.log(error);
    console.log(wantlistData);

    const lessOne = wantlistData.wantlist.pagination.items-1;
    const lessOneItem = lessOne.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Fragment>
      <SearchBar data={wantlistData} placeholder="Search Wantlist" />
        <div className="discogs__wantlist--toggle-options">
            <div className="discogs__wantlist--toggle-select">
                <select value={ wantlistData.wantlist.pagination.per_page } onChange={(event) => refetch( { per_page: parseInt(event.target.value) } ) }>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="125">125</option>
                </select>
            </div>
            <div className="discogs__wantlist--toggle-btns">

            </div>
        </div>
        <div className="discogs__wantlist--pagination">
            { wantlistData.wantlist.pagination.page } – { wantlistData.wantlist.pagination.per_page } of { wantlistData.wantlist.pagination.items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } 
            <a href="#" onClick={ () => refetch( { page: wantlistData.wantlist.pagination.page - 1 } ) }>Prev</a> { wantlistData.wantlist.pagination.page === 1 ? '1' : '<a href="">1</a>' }  <a href={ wantlistData.wantlist.pagination.urls.next }>2</a> <a href={ wantlistData.wantlist.pagination.urls.next }>3</a> ... { lessOneItem } { wantlistData.wantlist.pagination.items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
            <a href="#" onClick={ () => refetch( { page: wantlistData.wantlist.pagination.page + 1 }) }>Next</a>
        </div>
      <div className="discogs__wantlist--container">
        {wantlistData.wantlist.wants.map((want) => (
          <div
            className="discogs__wantlist--img"
            key={want.basic_information.id}
          >
            <img src={`${want.basic_information.cover_image}`} />
            <div className="discogs__wantlist--title">{want.basic_information.title}</div>
            <div className="discogs__wantlist--artist">{want.basic_information.artists[0].name}</div>
            <div className="">
              <a href="#">3 for sale</a> from $8
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Wantlist;
