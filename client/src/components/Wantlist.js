import React, { Component, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const WANTLIST_QUERY = gql`
  query WantlistQuery($per_page: Int!) {
    wantlist(per_page: $per_page) {
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
    const [ perPage, setPerPage ] = useState(50);
    const { loading, error, data: wantlistData, refetch, variables } = useQuery(WANTLIST_QUERY, {
      variables: { per_page: perPage }
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
    console.log(variables);
  return (
    <div>
      <div className="discogs__wantlist--search">
        <form className="discogs__wantlist--search-form">
          <input
            className="discogs__wantlist--searchInput"
            type="text"
            placeholder="Search Wantlist"
          />
          <svg
            fill="#ccc"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
          </svg>
        </form>
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
        <div className="discogs__wantlist-pagination">
            { wantlistData.wantlist.pagination.page } – { wantlistData.wantlist.pagination.per_page } of { wantlistData.wantlist.pagination.items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } 
            <a href={ wantlistData.wantlist.pagination.urls.prev ? wantlistData.wantlist.pagination.urls.prev : '' }>Prev</a> 1, 2, 3 ... 1,529 1,530 
            <button onClick={() => fetchMore({
              variables: {
                offset: wantlistData.wantlist.pagination.urls.next
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                console.log(fetchMoreResult)
              }
            })}>Next</button>
        </div>
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
    </div>
  );
}

export default Wantlist;
