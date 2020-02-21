import Header from './Header';
import "../css/NotFound.css";
import React from 'react';

export default function(props) {
    return (
        <div className="NotFound">
            <Header/>
            <NotFoundSmall/>
        </div>
    )
}

export function NotFoundSmall(props) {
    return ( 
    <div className="NotFoundSmall">
        <h1>Ουπς!</h1>

        <h2>Δυστυχώς, αυτή η σελίδα δεν υπάρχει...</h2>
    </div>
    )
}