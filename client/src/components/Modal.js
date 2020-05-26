import React, { Fragment } from 'react'

function Modal(props) {
    const bgImg = {
        backgroundImage: `url('${ props.data.profile.avatar_url }')`,
        backgroundRepeat: 'no-repeat'
    };
    return (
        <Fragment>
            <div className={`overlay ${props.modalActive ? 'show': ''}`}>
                    <div className="modal-close">
                        <a href="#" onClick={props.handleModalClose}><i className="fas fa-times"></i></a>
                    </div>
                    <div className="modal" style={bgImg}><div>
                            <a href="#" onClick={props.handleModalClose}>Close</a>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
export default Modal;