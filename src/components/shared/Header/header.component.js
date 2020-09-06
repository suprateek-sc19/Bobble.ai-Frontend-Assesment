import React, { Fragment } from 'react';
import '../../../index.css'

function Header(props) {
    return (
        <Fragment>
            <div className="img text-center">
            <img src={require('./logo.jpg')} height="70" width="200"></img>
            </div>
            
            <hr />
        </Fragment>
    );
}

export default Header;