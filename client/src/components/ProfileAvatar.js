import React, { Fragment } from "react";

function ProfileAvatar(props) {
  const bgImg = {
      backgroundImage: `url('${ props.data.profile.avatar_url }')`
  };
  return (
    <Fragment>
      <a href="#" onClick={props.handleModalOpen}    
        data-aos="fade-in" 
        data-aos-delay="100"
        data-aos-duration="10"
        data-aos-easing="ease-in-out">
        <div className="discogs__profile--img" style={bgImg}></div>
      </a>
    </Fragment>
  );
}
export default ProfileAvatar;
