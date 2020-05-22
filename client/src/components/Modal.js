import React, { Fragment } from 'react'

function Modal(props) {
    return (
        <Fragment>
            <div className={`overlay ${props.modalActive ? 'show': ''}`}>
                    <div className="modal-close">
                        <a href="#" onClick={props.handleModalClose}><i className="fas fa-times"></i></a>
                    </div>
                    <div className="modal">
                        <img src="../../public/img/joehenderson.jpg" />

                        <div>
                            <a href="#" onClick={props.handleModalClose}>Close</a>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
export default Modal;