import React, { Fragment, useState } from "react";

function SearchBar(props) {

  return (
    <Fragment>
      <div className="discogs--search">
        <form className="discogs--search-form" onSubmit={ (e) => e.preventDefault() }>
          <input
            className="discogs--searchInput"
            type="text"
            value={ props.searchTerm }
            placeholder={props.placeholder}
            onChange={(e) => props.handleSearch(e)}
          />
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
          </svg>
        </form>
      </div>
    </Fragment>
  );
}
export default SearchBar;
