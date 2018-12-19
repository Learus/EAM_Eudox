import React, {Component} from 'react';
import "../css/Banner.css";


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
                            <button>Δήλωση Συγγραμμάτων</button>
                            <div className="stud-banner-below"/>
                        </div>
                );

            case 'Secretary':
                return (
                        <div className="secr-banner">
                            <button>Δήλωση Συγγραμμάτων</button>
                            <div className="secr-banner-below"/>
                        </div>
                );

            case 'Publisher':
                return (
                        <div className="publ-banner">
                            <button>Δήλωση Συγγραμμάτων</button>
                            <div className="publ-banner-below"/>
                        </div>
                );

            case 'Distributor':
                return (
                        <div className="dist-banner">
                            <button>Δήλωση Συγγραμμάτων</button>
                            <div className="dist-banner-below"/>
                        </div>
                        
                );
        }
    }
}