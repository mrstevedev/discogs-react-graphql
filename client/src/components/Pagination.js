import React, { Fragment } from 'react';

function Pagination(props) {
    console.log('props in Pagination', props);
    return (
        <Fragment>
            { props.data.wantlist ? (
                <Fragment>
                    <div className="discogs--pagination">
                        { props.data.wantlist.pagination.page } – { props.data.wantlist.pagination.per_page } of { props.data.wantlist.pagination.items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } 
                        <a href="#" onClick={ () => props.refetch( { page: props.data.wantlist.pagination.page - 1 } ) }>Prev</a> { props.data.wantlist.pagination.page === 1 ? '1' : '<a href="">1</a>' }  <a href={ props.data.wantlist.pagination.urls.next }>2</a> <a href={ props.data.wantlist.pagination.urls.next }>3</a> ... 38,237 { props.data.wantlist.pagination.items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                        <a href="#" onClick={ () => props.refetch( { page: props.data.wantlist.pagination.page + 1 }) }>Next</a>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                     <div className="discogs--pagination">
                        { props.data.collection.pagination.page } - { props.data.collection.pagination.per_page } of { props.data.collection.pagination.items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                        <a href="#" onClick={ () => props.refetch( { page: props.data.collection.pagination.page -1 } )}>Prev</a> 1, 2, 3 ... 79  { props.data.collection.pagination.pages }
                        <a href="#" onClick={ () => props.refetch( { page: props.data.collection.pagination.page + 1 } ) }>Next</a>
                    </div>
                </Fragment>
            ) }           
        </Fragment>
    );
}
export default Pagination;