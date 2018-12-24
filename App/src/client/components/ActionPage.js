import React, { Component } from 'react';
import '../css/ActionPage.css';
import Header from './Header';

export default class ActionPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ActionList/>
            </div>
        );
    }
}

class ActionList extends Component {

    render() {
        <div className="grid">
            <ul>
                
            </ul>
        </div>
    }
}