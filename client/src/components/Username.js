import React, { Fragment } from "react";

function Username(props) {
  return (
    <Fragment>
      <div className="discogs__profile--username">
        <h1>{props.username}</h1>
      </div>
    </Fragment>
  );
}
export default Username;
