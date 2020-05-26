import React, { Fragment, useState } from "react";
import InfoIcon from "./InfoIcon";

function Footer() {
    const [infoActive, setInfoActive] = useState(false);
    function handleInfoClick() {
        console.log('info clicked');
        setInfoActive(true);

        if(infoActive === true) {
            setInfoActive(false);
        }
    }
  return (
    <Fragment>
      <footer>
        <div className="container-fluid">
          <InfoIcon 
            handleInfoClick={handleInfoClick}
            infoActive={infoActive}
          />
        </div>
      </footer>
    </Fragment>
  );
}
export default Footer;
