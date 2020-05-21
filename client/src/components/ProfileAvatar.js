import React, { Fragment } from "react";

function ProfileAvatar(props) {
  const bgImg = {
      backgroundImage: `url('${ props.data.profile.avatar_url }')`
  };
  return (
    <Fragment>
      <a href="#" onClick={props.handleModalOpen}>
        <div className="discogs__profile--img" style={bgImg}></div>
      </a>
    </Fragment>
  );
}
export default ProfileAvatar;
