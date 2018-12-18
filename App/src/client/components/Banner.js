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
                        Student
                    </div>
                );
            break;

            case 'Secretary':
                return (
                    <div className="secr-banner">
                        Secretary
                    </div>
                );
            break;

            case 'Publisher':
                return (
                    <div className="publ-banner">
                        Publisher
                    </div>
                );
            break;

            case 'Distributor':
                return (
                    <div className="dist-banner">
                        Distributor
                    </div>
                );
            break;
        }
    }
}