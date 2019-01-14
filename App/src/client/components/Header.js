import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import '../css/Header.css';

import Actions from './Actions';

import logo from '../images/logo.svg';

import LoginPopup from './Login';
import Popup from 'reactjs-popup';
import autoBind from 'react-autobind';

export default class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {user: JSON.parse(sessionStorage.getItem('EudoxusUser')) };
        autoBind(this);
    }

    loginHandler() {
        this.setState({
            user: JSON.parse(sessionStorage.getItem('EudoxusUser')) 
        });
        this.signalLoggedStatus();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const user = JSON.parse(sessionStorage.getItem('EudoxusUser'));

        if (user) {
            if (nextState.user){
                if (nextState.user.Username !== user.Username) {
                    this.setState({user: user})
                }
            }
            else {
                this.setState({user: user})
            }
        }
        return true;
    }

    signalLoggedStatus() {
        if (this.props.signalLoggedStatus) this.props.signalLoggedStatus();
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
                                     loginHandler={this.loginHandler}/>
                </div>
    
                <div className="header-bottom">

                    <button className="MenuOptionButton" onClick={() => browserHistory.push('/')}>
                        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>Αρχική</Link>
                    </button>

                    <MenuOption type="Student"/>
    
                    <MenuOption type="Publisher"/>
    
                    <MenuOption type="Secretary"/>
    
                    <MenuOption type="Distributor"/>

                    <MenuOption type="Search" prefix="/search"/>
    
                    <button className="MenuOptionButton" onClick={() => browserHistory.push('/announcements')}>
                        <Link to="/announcements" style={{textDecoration: 'none', color: 'white'}}>Ανακοινώσεις</Link>
                    </button>
    
                </div>
            </div>
        );
    }
    
}

function AccountSnapshot(props) {

    if(props.user != null)
    {
        let type = props.user.Type;
        if (props.user.Type === "PublDist")
            type = "Publisher";

        const meta = Actions[`${type}`];
        

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
                position="bottom right"
            >

                <div>
                    <button key="profile" onClick={ () => {browserHistory.push("/profile")} }>
                        Το προφίλ μου
                    </button>

                    <button key="help" onClick={ () => {browserHistory.push(`/actionpage/${type}/${meta.Actions.length - 1}`)} }>
                        Βοήθεια
                    </button>

                    <button key="logout" onClick={ () => {  sessionStorage.removeItem('EudoxusUser');
                                                            props.loginHandler();} }>
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
                <LoginPopup loginHandler={props.loginHandler}/>
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
        let path;

        if (props.prefix) path = `${props.prefix}/${index}`
        else path = `/actionpage/${props.type}/${index}`

        return (
            <button key={option} onClick={ () => {browserHistory.push(path)} }>
                {option}
            </button>
        )
    });

    return (
        <Popup 
            className = "SubMenuPopup"
            trigger = { open => (
                <button onClick={() => {
                    let path;
                    if (props.prefix) path = `${props.prefix}/${meta.Default}`
                    else path = `/actionpage/${props.type}/${meta.Default}`
                    browserHistory.push(path)
            }} 
                className={open ? "MenuOptionButton Open" : "MenuOptionButton Closed"}>
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