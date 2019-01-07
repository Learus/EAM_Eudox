import React, { Component } from 'react';
import '../css/ActionPage.css';
import Header from './Header';
import Actions from './Actions';
import {Link, browserHistory} from 'react-router';
import autoBind from 'react-autobind';
import axios from 'axios';

export default class ActionPage extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.params);
        
        this.state = { 
            user: null,
            type: this.props.params.type,
            meta: Actions[`${this.props.params.type}`],
            active: this.props.params.active
        };

        autoBind(this);
    }

    signalLoggedStatus() {
        this.forceUpdate();
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({
                type: nextProps.params.type,
                meta: Actions[`${nextProps.params.type}`],
                active: nextProps.params.active
            });
            // return true;
        }
        return true;
    }

    changeActive(value) {
        this.setState({
            active: value
        })
    }

    render() {

        return (
            <div className = 'Container'>
                <Header signalLoggedStatus={this.signalLoggedStatus}/>
                <ActionList meta={this.state.meta} active={this.state.active} activeChanger={this.changeActive}/>
                <Main id={this.props.params.id} meta={this.state.meta} active={this.state.active}/>
            </div>
        );
    }
}

function Main(props) {
    if (props.meta.Components[props.active])
        return (
            <div className="Main">
                {props.meta.Components[props.active]( {id: props.id} )}
            </div>
        )

    return (null);
}

function ActionList(props) {

    const actions = props.meta.Actions.map( (action, index) => {
        return (
            <button 
            key={action} 
            onClick={ () => {
                browserHistory.push(`/actionpage/${props.meta.Type}/${index}`);
                props.activeChanger(index);
            } }
            className = { (index.toString() === props.active ? "ActionButton Active " : "ActionButton " ) + props.meta.Type}
            >
                {action}
            </button>
        )
    })

    return(
        <div className={"ActionContainer " + props.meta.Type}>
            <div>
                {actions}
            </div>
        </div>
    );
}