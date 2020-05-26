import React, { Fragment } from 'react';
import Moment from 'react-moment';

function Results(props) {
    console.log('filteredRelease::::::', props.filteredRelease);
    return (
        <Fragment>
        { props.data.collection ? (
             props.data.collection && props.filteredRelease.length > 0 ? (
                <div className="discogs__collection--container">
                   { props.filteredRelease.map((release) => (
                        <div className="discogs__collection--img" key={release.basic_information.id}>
                            <div className="discogs__collection--overlay">
                                <div className="discogs__collection-overlay-inner">
                                    <p>{ release.basic_information.artists[0].name } – { release.basic_information.title }</p>
                                    <p>Added to collection on <Moment format="MMMM DD, YYYY">{ release.date_added }</Moment></p>
                                </div>
                            </div>  
                            <img src={ `${ release.basic_information.cover_image }` } />
                        </div>
                   )) }
                </div>
           ) : (
            <div className="discogs__collection--container">            
            { props.data.collection.releases ? props.data.collection.releases.map( release => (
                <div className="discogs__collection--img" key={ release.basic_information.id }>
                    <div className="discogs__collection--overlay">
                        <div className="discogs__collection--overlay-inner"> 
                            <p>{ release.basic_information.artists[0].name } - { release.basic_information.title }</p>
                            <p>Added to collection on <Moment format="MMMM DD, YYYY">{ release.date_added }</Moment></p>
                        </div>
                    </div>
                    <img src={ `${ release.basic_information.cover_image }` } />
                </div>
                )) : ''}
            </div>
           ) 
        ) : props.data.wantlist ? (
            props.data.wantlist && props.filteredRelease.length > 0 ? (
            <Fragment>
                <div className="discogs__wantlist--container">
                    { props.filteredRelease.map((want) => (
                    <div
                        className="discogs__wantlist--img"
                        key={want.basic_information.id} >
                        <img src={`${want.basic_information.cover_image}`} />
                        <div className="discogs__wantlist--title">{want.basic_information.title}</div>
                        <div className="discogs__wantlist--artist">{want.basic_information.artists[0].name}</div>
                        <div className="">
                        <a href="#">3 for sale</a> from $8
                        </div>
                    </div>
                    ))}
                </div>
            </Fragment>
           ) :  (
            <Fragment>
            <div className="discogs__wantlist--container">
               { props.data.wantlist ? props.data.wantlist.wants.map((want) => (
               <div
                   className="discogs__wantlist--img"
                   key={want.basic_information.id} >
                   <img src={`${want.basic_information.cover_image}`} />
                   <div className="discogs__wantlist--title">{want.basic_information.title}</div>
                   <div className="discogs__wantlist--artist">{want.basic_information.artists[0].name}</div>
                   <div className="">
                   <a href="#">3 for sale</a> from $8
                   </div>
               </div>
               )) : '' }
           </div>
       </Fragment>
           )
        ) : ''}
        </Fragment>
    );
}

export default Results;
