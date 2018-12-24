import React, { Component } from 'react';
import '../css/Header.css';
import Profile from '../components/Profile';
import logo from '../images/logo.svg';

export default class Header extends Component {

    render() {
        return(
            <div>
                <div className="header-main">
                    <img src={logo} width="125"/>
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
                            <li>Το προφίλ μου</li>
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