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
        
        this.state = { 
            user: null,
            type: this.props.params.type,
            meta: Actions[`${this.props.params.type}`],
            active: this.props.params.active
        };
        
        if (this.props.params.user) {
            axios.post('/api/getUser', {
                username: this.props.params.user
            })
            .then(res => {
                if (res.data.error) {
                    console.error(res.data.message);
                }
                else {
                    this.setState({
                        user: res.data.data
                    })
                }
            })
            .catch(err => console.error(err))
        }

        autoBind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({
                type: nextProps.params.type,
                meta: Actions[`${nextProps.params.type}`],
                active: nextProps.params.active
            });
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
                <Header user={this.state.user}/>
                <ActionList meta={this.state.meta} active={this.state.active} activeChanger={this.changeActive}/>
                <Main meta={this.state.meta} active={this.state.active} state={this.state}/>
            </div>
        );
    }
}

function Main(props) {
    if (props.meta.Components[props.active])
        return (
            <div className="Main">
                {props.meta.Components[props.active](props.state)}
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