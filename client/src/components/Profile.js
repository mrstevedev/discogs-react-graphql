import React, { Component, Fragment } from 'react'

class Profile extends Component {
    handleModalOpen() {
        console.log('handleShowModal Ran');
        const overlay = document.querySelector('.overlay');
        const modal = document.querySelector('.modal');

        overlay.classList.add('show');
    }

    handleModalClose() {
        console.log('handleModalClose Ran');

        const overlay = document.querySelector('.overlay');
        const modal = document.querySelector('.modal');

        overlay.classList.remove('show');
    }

    render() {
        return (
            <Fragment>
                <div className="discogs__profile--container" 
                    data-aos="fade-in" 
                    data-aos-delay="900"
                    data-aos-duration="10"
                    data-aos-easing="ease-in-out">
                    <a href="#" onClick={this.handleModalOpen}>
                        <div className="discogs__profile--img"></div>
                    </a>
                    <div className="discogs__profile--username">
                        <h1>eckosneekz</h1>
                    </div>
                    <div className="discogs__profile--section">
                        <h1 className="discogs__profile--header">Collection</h1>
                        <span className="discogs__profile--sub">1,945</span>
                    </div>
                    <div className="discogs__profile--section">
                        <h1 className="discogs__profile--header">Wantlist</h1>
                        <span className="discogs__profile--sub">32,215</span>

                    </div>
                </div>
                <div className="overlay">
                    <div className="modal-close">
                        <a href="#" onClick={this.handleModalClose}>Close</a>
                    </div>
                    <div className="modal">
                        <img src="../../public/img/joehenderson.jpg" />

                        <div>
                            <a href="#" onClick={this.handleModalClose}>Close</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Profile;
