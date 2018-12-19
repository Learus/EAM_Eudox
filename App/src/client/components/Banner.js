import React, {Component} from 'react';
import "../css/Banner.css";
import stud_logo from '../images/student_logo.png';
import publ_logo from '../images/publisher_logo.png';

export default class Banner extends Component {

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
                            <button>Ανταλλαγή Συγγραμμάτων</button>
                            <button>Προβολή Δηλώσεων</button>
                            <div className="stud-banner-below"/>
                        </div>
                );

            case 'Secretary':
                return (
                        <div className="secr-banner">
                            <img src={stud_logo} width="200"/>
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
                            <button>Επιλογή Σημείων Διανομής</button>
                            <button>Προβολή Περασμένων Συγγραμμάτων</button>
                            <div className="publ-banner-below"/>
                        </div>
                );

            case 'Distributor':
                return (
                        <div className="dist-banner">
                            <img src={stud_logo} width="200"/>
                            <h1>Διανομείς</h1>
                            <button>Παράδοση Συγγραμμάτων</button>
                            <button>Προβολή Αιτήσεων</button>
                            <div className="dist-banner-below"/>
                        </div>
                        
                );
        }
    }
}