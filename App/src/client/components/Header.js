import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router";
import '../css/Header.css';
import Profile from './ActionPage';
import logo from '../images/logo.svg';

export default class Header extends Component {

    render() {
        return(
            <div>
                <div className="header-main">
                    <Link to="/"><img src={logo} width="125"/></Link>
                    <AccountSnapshot/>
                </div>

                <div className="header-bottom">
                    <Link className="header-bottom-entry">Φοιτητές</Link>
                    <Link className="header-bottom-entry">Εκδότες</Link>
                    <Link className="header-bottom-entry">Γραμματείες</Link>
                    <Link className="header-bottom-entry">Διανομείς</Link>
                    <Link className="header-bottom-entry">Σχετικά με εμάς</Link>
                </div>
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
                <div className="account" onClick={this.handleClick}>
                    Joseph_Stalin

                    {
                        this.state.open ?
                        <span className="account_button_downward"/>
                        :
                        <span className="account_button"/>
                    }
                    
                    {
                        this.state.open ? 
                        <ul>
                            <li><Link to="/actionpage" className="Link">Το προφίλ μου</Link></li>
                            <li><Link to="/actionpage" className="Link">Ρυθμίσεις</Link></li>
                            <li><Link to="/actionpage" className="Link">Βοήθεια</Link></li>
                            <li><Link to="/actionpage" className="Link">Αποσύνδεση</Link></li>
                        </ul>
                        :
                        ''
                    }

                </div>
        );
    }
}