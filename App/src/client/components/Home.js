import React, { Component } from 'react';
import Header from './Header';

import { Link, browserHistory } from "react-router";

import '../css/Home.css';

import Actions from './Actions';
import Announcements from './Announcements'

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
            <div className="Home">
                <Header signalLoggedStatus={this.signalLoggedStatus}/>
                    <main>
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
                    <AnnouncementTable/>
                </main>
                
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
            return {
                name: meta.Actions[index],
                index: index
            }
        })

        buttons = buttons.map( (button) => {
            return (
                <li key={button.name} onClick={ () => {browserHistory.push(`/actionpage/${this.props.type}/${button.index}`)} }>
                    <Link to={`/actionpage/${this.props.type}/${button.index}`} className="BannerLink">{button.name}</Link>
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

class AnnouncementTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(Announcements)
        const announcements = Announcements.map((a, index) => {
            const even = index % 2 === 0 ? "Even" : "Odd"
            return (
                <div className={`Announcement ${even}`} key={index}>
                    <h3>{a.title}</h3>
                    <p>{a.type}</p>
                </div>
            )
        })

        return (
            <div className="AnnouncementTable">
                <h2>Ανακοινώσεις</h2>
                <div className="Announcements">
                    {announcements}
                </div>
                
            </div>
        )
    }
}
