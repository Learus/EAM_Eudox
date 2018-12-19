import React, { Component } from 'react';
import '../css/Header.css';
import Profile from '../components/Profile';
import logo from '../images/logo.svg';

export default class Header extends Component{
    render() {
        return(
            <div>
                <div className="header-main">
                    <img src={logo} width="125"/>
                    <Profile/>
                </div>

                <div className="header-bottom"/>
            </div>
        );
    }
}