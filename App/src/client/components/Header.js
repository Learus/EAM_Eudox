import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import '../css/Header.css';

import Actions from './Actions';

import logo from '../images/logo.svg';

import {LoginPopup} from './Login';
import Popup from 'reactjs-popup';

export default function Header(props) {

    return(
        <div className="Header">
            <div className="header-top">
                <Link to="/" className="home-img">
                    <img src={logo}/>
                    <br/>
                    Εύδοξος
                </Link>
                <AccountSnapshot user={props.user}/>
            </div>

            <div className="header-bottom">
                <MenuOption type="Student"/>

                <MenuOption type="Publisher"/>

                <MenuOption type="Secretary"/>

                <MenuOption type="Distributor"/>

                <button className="MenuOptionButton" onClick={() => browserHistory.push('/about')}>
                    <Link to="/about" style={{textDecoration: 'none', color: 'white'}}>Σχετικά με εμάς</Link>
                </button>

            </div>
        </div>
    );
}

function AccountSnapshot(props) {

    if(props.user != null)
    {

        return (
            <Popup 
                className='AccountPopup' 
                trigger = {open => (
                    <Link className="AccountPopupText">
                        {props.user.Username}
                        {
                            open ?
                            <span className="account_button"/>
                            :
                            <span className="account_button_downward"/>
                        }
                    </Link>
                )}
            >

                <ul>
                    <li key="profile" onClick={ () => {browserHistory.push("/actionpage")} }>
                        <Link to="/actionpage" className="Link">Το προφίλ μου</Link>
                    </li>
                    <li key="settings" onClick={ () => {browserHistory.push("/actionpage")} }>
                        <Link to="/actionpage" className="Link">Ρυθμίσεις</Link>
                    </li>
                    <li key="help" onClick={ () => {browserHistory.push("/actionpage")} }>
                        <Link to="/actionpage" className="Link">Βοήθεια</Link>
                    </li>
                    <li key="logout" onClick={ () => {browserHistory.push("/actionpage")} }>
                        <Link to="/actionpage" className="Link">Αποσύνδεση</Link>
                    </li>
                </ul>

            </Popup>
        );
    }
    else
    {
        return(
            <div className="account-empty">
                <LoginPopup/>
                &nbsp;
                |
                &nbsp;
                <Link to="/signup" className="Link">
                    Εγγραφή
                </Link>
            </div>
        );
    }
}

function MenuOption(props) {

    const meta = Actions[`${props.type}`];
    let links = meta.Actions;
    links = links.map ( (option, index) => {
        return (
            <li key={option} onClick={ () => {browserHistory.push(`/actionpage/${props.type}/${index}`)} }>
                <Link to={`/actionpage/${props.type}/${index}`} className="MenuOptionLink">
                    {option}
                </Link>
            </li>
        )
    });

    return (
        <Popup 
            className = "SubMenuPopup"
            trigger = { open => (
                <button className={open ? "MenuOptionButton Open" : "MenuOptionButton Closed"}>
                    {meta.Header}
                </button>
            )}
            closeOnDocumentClick
            on="hover"
            position="bottom left"
            arrow={false}
        >
            <ul>
                {links}
            </ul>
        </Popup>

    );
}