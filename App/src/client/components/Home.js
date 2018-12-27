import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from "react-router";

import '../css/Home.css';

import stud_logo from '../images/student_logo.png';
import secr_logo from '../images/secretary_logo.svg';
import publ_logo from '../images/publisher_logo.png';
import dist_logo from '../images/distributor_logo.svg';

export default class Home extends Component{
    render() {
        return(
            <div>
                <Header/>
                <div className="grid-container">
                    <Banner type='Student'/>
                    <Banner type='Publisher'/>
                    <Banner type='Secretary'/>
                    <Banner type='Distributor'/>
                </div>
            </div>
        );
    }
}

class Banner extends Component {

    constructor(props) {
        super(props);
        this.type = props.type;
    }

    render() {
        switch(this.type)
        {
            case 'Student':
                return (
                        <div className="stud-banner">
                            <img src={stud_logo} width="200"/>
                            <h1>Φοιτητές</h1>
                            <button>Δήλωση Συγγραμμάτων</button>
                            {/* <button>Ανταλλαγή Συγγραμμάτων</button> */}
                            <button>Προβολή Δηλώσεων</button>
                            <div className="stud-banner-below"/>
                        </div>
                );

            case 'Secretary':
                return (
                        <div className="secr-banner">
                            <img src={secr_logo} width="150"/>
                            <h1>Γραμματείες</h1>
                            <button>Καταχώρηση Μαθημάτων</button>
                            <button>Αντιστοίχηση Συγγραμμάτων</button>
                            <div className="secr-banner-below"/>
                        </div>
                );

            case 'Publisher':
                return (
                        <div className="publ-banner">
                            <img src={publ_logo} width="97"/>
                            <h1>Εκδότες</h1>
                            <button>Καταχώρηση Συγγραμμάτων</button>
                            {/* <button>Επιλογή Σημείων Διανομής</button>
                            <button>Προβολή Περασμένων Συγγραμμάτων</button> */}
                            <div className="publ-banner-below"/>
                        </div>
                );

            case 'Distributor':
                return (
                        <div className="dist-banner">
                            <img src={dist_logo} width="99"/>
                            <h1>Διανομείς</h1>
                            <button>Παράδοση Συγγραμμάτων</button>
                            {/* <button>Προβολή Αιτήσεων</button> */}
                            <div className="dist-banner-below"/>
                        </div>
                        
                );
        }
    }
}