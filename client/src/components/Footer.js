import React, { Fragment } from "react";

function Footer() {
    function handleInfoClick() {
        console.log('info clicked');
    }
  return (
    <Fragment>
      <footer>
        <div className="container-fluid">
          <div className="discogs__footer--info">
              <div>
                  <a href="https://www.discogs.com/user/eckosneekz">https://www.discogs.com/user/eckosneekz</a>
              </div>
              <div className="discogs__footer--info-window">
               
                  <h3>Project was built with</h3>
                  <div className="">
                      <ul>
                          <li>Reactjs</li>
                          <li>Nodejs</li>
                          <li>GraphQL</li>
                      </ul>
                  </div>
              </div>
                <a href="#" onClick={handleInfoClick} className="discogs__footer--info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#e5e5e5" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"/></svg>
                </a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
export default Footer;
