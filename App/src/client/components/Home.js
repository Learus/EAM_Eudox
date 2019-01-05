import React, { Component } from 'react';
import Header from './Header';

import { Link, browserHistory } from "react-router";

import '../css/Home.css';

import Actions from './Actions';
import autobind from 'react-autobind';

import stud_logo from '../images/student_logo.png';
import secr_logo from '../images/secretary_logo.svg';
import publ_logo from '../images/publisher_logo.png';
import dist_logo from '../images/distributor_logo.svg';

export default class Home extends Component{

    constructor(props) {
        super(props);

        autobind(this);
    }

    signalLoggedStatus() {}

    render() {
        return(
            <div>
                <Header signalLoggedStatus={this.signalLoggedStatus}/>
                <div className="grid-container">
                    <Banner 
                        type='Student'/>
                    <Banner 
                        type='Publisher'/>
                    <Banner 
                        type='Secretary'/>
                    <Banner 
                        type='Distributor'/>
                </div>
            </div>
        );
    }
}

function BannerImage(props) {
    switch(props.type) {
        case 'Student':
            return <img src={stud_logo} width="200" className="BannerImage"/>

        case 'Secretary':
            return <img src={secr_logo} width="150" className="BannerImage"/>

        case 'Publisher':
            return <img src={publ_logo} width="97" className="BannerImage"/>

        case 'Distributor':
            return <img src={dist_logo} width="99" className="BannerImage"/>
    }
}

class Banner extends Component {

    constructor(props) {
        super(props);
        this.type = props.type;
    }

    render() {
        const meta = Actions[`${this.props.type}`];
        let buttons = meta.Quicks.map(index => {
            return meta.Actions[index];
        })

        buttons = buttons.map( (button, index) => {
            return (
                <li key={button} onClick={ () => {browserHistory.push(`/actionpage/${this.props.type}/${index}`)} }>
                    <Link to={`/actionpage/${this.props.type}/${index}`} className="BannerLink">{button}</Link>
                </li>
            )
        });

        return (
            <div className={this.props.type + "Banner Banner"}>
                <BannerImage type={this.props.type}/>
                <h1>{meta.Header}</h1>
                <ul>
                    {buttons}
                </ul>
                <div className={this.props.type + "BannerBelow BannerBelow"}/>
            </div>
        )
           
    }
}
