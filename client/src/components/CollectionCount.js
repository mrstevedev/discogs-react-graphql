import React, { Fragment } from "react";

function CollectionCount(props) {
  return (
    <Fragment>
      <div className="discogs__profile--section">
        <h1 className="discogs__profile--header">Collection</h1>
        <span className="discogs__profile--sub">
          {props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
    </Fragment>
  );
}
export default CollectionCount;
