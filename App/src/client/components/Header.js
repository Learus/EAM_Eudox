import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router";
import '../css/Header.css';
import Profile from '../components/Profile';
import logo from '../images/logo.svg';

export default class Header extends Component {

    render() {
        return(
            <div>
                <div className="header-main">
                    <Link to="/"><img src={logo} width="125"/></Link>
                    <AccountSnapshot/>
                </div>

                <div className="header-bottom"/>
            </div>
        );
    }
}

class AccountSnapshot extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};

        //Bindings
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {


        this.setState( state => ( {open: !state.open} ) );
    }

    render() {

        

        return (
                <div className="account">
                    Joseph_Stalin

                    {
                        this.state.open ?
                        <span className="account_button_downward" style={this.css} onClick={this.handleClick}/>
                        :
                        <span className="account_button" style={this.css} onClick={this.handleClick}/>
                    }
                    
                    {
                        this.state.open ? 
                        <ul>
                            <li><Link to="/profile" className="Link">Το προφίλ μου</Link></li>
                            <li>Ρυθμίσεις</li>
                            <li>Βοήθεια</li>
                            <li>Αποσύνδεση</li>
                        </ul>
                        :
                        <ul/>
                    }

                </div>
        );
    }
}