import React, { Component } from 'react';
import '../css/ActionPage.css';
import Header from './Header';

export default class ActionPage extends Component {

    constructor(props) {
        this.state = { accountType: props.accountType };
    }

    render() {
        return (
            <div>
                <Header/>
                <ActionList accountType={this.state.accountType}/>
            </div>
        );
    }
}

class ActionList extends Component {

    constructor(props) {
        this.state = { accountType: props.accountType };
    }

    render() {

        switch(this.state.accountType)
        {
            case "stud":
                return (
                    <div className="stud-action-bar">
                        <button>
                            
                        </button>
                    </div>
                );
                break;

            case "publ":
                return (
                    <div className="publ-action-bar">

                    </div>
                );
                break;

            case "secr":
                return (
                    <div className="secr-action-bar">

                    </div>
                );
                break;
            
            case "dist":
                return (
                    <div className="dist-action-bar">

                    </div>
                );
                break;
        }
    }
}