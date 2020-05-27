import React, { Fragment } from 'react'

function ToggleCount(props) {
    return (
        <Fragment>
            { props.data.collection ? (
                <div className="discogs__wantlist--toggle-options">
                    <div className="discogs__wantlist--toggle-select">
                        <select value={ props.data.collection.pagination.per_page } onChange={(event) => props.refetch( { per_page: parseInt(event.target.value) } )}>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="125">125</option>
                        </select>
                    </div>
                <div className="discogs__wantlist--toggle-btns"></div>
            </div>
            ) : props.data.wantlist ? (
                <div className="discogs__wantlist--toggle-options">
                    <div className="discogs__wantlist--toggle-select">
                        <select value={ props.data.wantlist.pagination.per_page } onChange={(event) => props.refetch( { per_page: parseInt(event.target.value) } ) }>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="125">125</option>
                        </select>
                    </div>
                    <div className="discogs__wantlist--toggle-btns">

                    </div>
                </div>
            ) : '' }
        </Fragment>
    )
}
export default ToggleCount;