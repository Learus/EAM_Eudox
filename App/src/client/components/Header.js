import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import '../css/Header.css';
import Profile from './ActionPage';
import logo from '../images/logo.svg';
import {LoginPopup} from './Login';
import Popup from 'reactjs-popup';

export default class Header extends Component {

    render() {
        return(
            <div>
                <div className="header-top">
                    <Link to="/" className="home-img">
                        <img src={logo}/>
                        <br/>
                        Εύδοξος
                    </Link>
                    <AccountSnapshot/>
                </div>

                <div className="header-bottom">
                    <MenuOption category="Φοιτητές" optionList = { ["Δήλωση Συγγραμμάτων",
                                                                    "Ανταλλαγή Συγγραμμάτων",
                                                                    "Προβολή Δηλώσεων"] }/>

                    <MenuOption category="Εκδότες" optionList = { ["Καταχώρηση Συγγραμμάτων",
                                                                    "Επιλογή Σημείων Διανομής",
                                                                    "Προβολή Περασμένων Συγγραμμάτων"] }/>

                    <MenuOption category="Γραμματείες" optionList = { ["Καταχώρηση Μαθημάτων",
                                                                    "Αντιστοίχηση Συγγραμμάτων"] }/>

                    <MenuOption category="Διανομείς" optionList = { ["Παράδοση Συγγραμμάτων",
                                                                    "Προβολή Αιτήσεων"] }/>

                    <button className="MenuOptionButton">Σχετικά με εμάς</button>

                </div>
            </div>
        );
    }
}

class AccountSnapshot extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        // this.user = "Μπαιραμης"; // Εδω κατσε και βαλε συνδεση με τη βαση ή cookies ή δεν ξερω και γω τι σκατα

        if(this.user != null)
        {

            return (
                <Popup 
                    className='AccountPopup' 
                    trigger = {open => (
                        <Link className="AccountPopupText">
                            {this.user}
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
}

function MenuOption(props) {

    const links = props.optionList.map(option => {
        return (
                <li key={option} onClick={ () => {browserHistory.push("/actionpage")} }>
                    <Link to="/actionpage" className="MenuOptionLink">
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
                    {props.category}
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