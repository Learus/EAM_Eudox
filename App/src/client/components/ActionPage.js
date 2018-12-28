import React, { Component } from 'react';
import '../css/ActionPage.css';
import Header from './Header';
import Actions from './Actions';

export default class ActionPage extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            type: this.props.params.type,
            meta: Actions[`${this.props.params.type}`],
            active: this.props.params.active
        };
    }

    render() {
        return (
            <div>
                <Header/>
                <ActionList meta={this.state.meta}/>
                <Main meta={this.state.meta} active={this.state.active}/>
            </div>
        );
    }
}

function Main(props) {
    if (props.meta.Components[props.active])
        return props.meta.Components[props.active]();

    return (null);
}

class ActionList extends Component {

    constructor(props) {
        super(props);
        this.state = { meta: props.meta };
    }

    render() {

        switch(this.state.meta)
        {
            case "stud":
                return (
                    <div className="stud-action-bar">
                        <button>
                            
                        </button>
                    </div>
                );

            case "publ":
                return (
                    <div className="publ-action-bar">

                    </div>
                );

            case "secr":
                return (
                    <div className="secr-action-bar">

                    </div>
                );
            
            case "dist":
                return (
                    <div className="dist-action-bar">

                    </div>
                );
            default:
                return(null);
        }
    }
}