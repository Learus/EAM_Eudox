import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import '../css/Header.css';

import Actions from './Actions';

import logo from '../images/logo.svg';

import {LoginPopup} from './Login';
import Popup from 'reactjs-popup';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {user: JSON.parse(sessionStorage.getItem('EudoxusUser')) };
        this.signalLoggedStatus = props.signalLoggedStatus;
    }

    loginHandler() {
        this.setState({
            user: JSON.parse(sessionStorage.getItem('EudoxusUser')) 
        });
    }

    render() {
        return(
            <div className="Header">
                <div className="header-top">
                    <Link to="/" className="home-img">
                        <img src={logo}/>
                        <br/>
                        Εύδοξος
                    </Link>
                    <AccountSnapshot user={this.state.user}
                                     loginHandler={this.loginHandler.bind(this)}
                                     signalLoggedStatus={this.signalLoggedStatus}/>
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

                <div>
                    <button key="profile" onClick={ () => {browserHistory.push("/profile")} }>
                        Το προφίλ μου
                    </button>

                    <button key="settings" onClick={ () => {browserHistory.push("/actionpage")} }>
                        Ρυθμίσεις
                    </button>

                    <button key="help" onClick={ () => {browserHistory.push("/actionpage")} }>
                        Βοήθεια
                    </button>

                    <button key="logout" onClick={ () => {  sessionStorage.removeItem('EudoxusUser');
                                                            props.loginHandler();
                                                            props.signalLoggedStatus(); } }>
                        Αποσύνδεση
                    </button>
                </div>

            </Popup>
        );
    }
    else
    {
        return(
            <div className="account-empty">
                <LoginPopup loginHandler={props.loginHandler} signalLoggedStatus={props.signalLoggedStatus}/>
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
            <button key={option} onClick={ () => {browserHistory.push(`/actionpage/${props.type}/${index}`)} }>
                {/* <Link to={`/actionpage/${props.type}/${index}`} className="MenuOptionLink"> */}
                    {option}
                {/* </Link> */}
            </button>
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
            <div>
                {links}
            </div>
        </Popup>

    );
}