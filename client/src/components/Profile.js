import React, { Component, Fragment } from 'react'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false
        }
    }
    componentDidMount() {
    }
    
    handleModalOpen = () => {
        console.log('handleShowModal Ran');
        // Set modalActive to true
        this.setState({
            modalActive: true
        }, () => console.log(this.state.modalActive) );
    }

    handleModalClose = () => {
        console.log('handleModalClose Ran');

        this.setState({
            modalActive: false
        }, () => console.log(this.state.modalActive) );
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
                <div className={`overlay ${this.state.modalActive ? 'show': ''}`}>
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
