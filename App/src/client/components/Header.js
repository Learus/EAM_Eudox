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
                    <Link to="/" className="home-img"><img src={logo} width="125"/>Εύδοξος</Link>
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

                    <button className="header-bottom-entry">Σχετικά με εμάς</button>

                </div>
            </div>
        );
    }
}

class AccountSnapshot extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false, logged_in: false};

        //Bindings
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleClick() {
        if(!this.state.open)
        {
            document.addEventListener('click', this.handleOutsideClick, false);
        }
        else
        {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState( state => ( {open: !state.open} ) );
    }

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
          }
      
          this.handleClick();
    }

    render() {

        this.user = "Μπαιραμης"; // Εδω κατσε και βαλε συνδεση με τη βαση ή cookies ή δεν ξερω και γω τι σκατα

        if(this.user != null)
        {

            return (
                    <div className="account" ref={node => {this.node = node;}} onClick={this.handleClick} >

                        {this.user}

                        {
                            this.state.open ?
                            <span className="account_button"/>
                            :
                            <span className="account_button_downward"/>
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
        else
        {
            return(
                <div className="account-empty">
                        Σύνδεση | <space/>
                    <Link to="/signup" className="Link">
                        Εγγραφή
                    </Link>
                </div>
            );
        }
    }
}

class MenuOption extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: props.category,
            optionList: props.optionList,
            isOpen: false
        };

        this.objectList = this.state.optionList.map( (option) => 
            <li><Link className="Link" key={option}>{option}<br/></Link></li>
            );

        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

    }
    
    handleClick() {
        if(!this.state.open)
        {
            document.addEventListener('click', this.handleOutsideClick, false);
        }
        else
        {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState( state => ( {isOpen: !state.isOpen} ) );
    }

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
          }
      
          this.handleClick();
    }

    render() {

        return (
            <button className="header-bottom-entry" ref={node => {this.node = node;}} onClick={this.handleClick}>
                {this.state.category}

                { this.state.isOpen ? <ul>{this.objectList}</ul> : ''}

            </button>
        );
    }
}