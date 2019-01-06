import React, {Component} from 'react';
import { Link, browserHistory } from "react-router";
//import MagnifyingGlass from '../images/';
import '../css/StudentActions.css';
import autoBind from 'react-autobind';
import axios from 'axios';

export {
    StudentApplications,
    StudentHelp
};


function StudentApplications(props) {

    let username = null;
    let user = JSON.parse(sessionStorage.getItem('EudoxusUser'));

    if(user && user.Type === 'Student')
    {
        username = user.Username;

        return(
            <div className="StudentApplications">
                <h1>Οι Δηλώσεις Μου</h1>
                <div className = "line"/>
                <div className = "grid">
                    <StudentApplicationList username={username} title="Τρέχουσα Δήλωση" showCurrent={true} pos="left"/>
                    <StudentApplicationList username={username} title="Προηγούμενες Δηλώσεις" showCurrent={false} pos="right"/>
                </div>
            </div>
        );
    }
    else
    {
        return(
            <div className="StudentApplications">
                <h1>Οι Δηλώσεις Μου</h1>
                <div className = "line"/>

                <h2>Για να δείτε τις δηλώσεις σας πρέπει να συνδεθείτε σε φοιτητικό λογαριασμό.</h2>
            
            </div>
        );
    }

    
}

class StudentApplicationList extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            list: null,
            title: props.title,
            showCurrent: props.showCurrent,
            pos: props.pos
        };

        if(props.username)
        {
            axios.post('/api/getStudentApplications', {
                username: props.username
            }).then( res => {
                if (res.data.error) {
                    console.error(res.data.message);
                }
                else {
                    let index = 0;
                    this.setState({
                        list: res.data.data.map( (item) => {
                            //console.log(item);
                            if( (!this.state.showCurrent && !item.Is_Current)  || (item.Is_Current && this.state.showCurrent)  ) {

                                let dateTime = item.Date.split('T');

                                let dateParts = dateTime[0].split('-');
                                
                                let string;

                                if(dateParts[1] >= '10')
                                    string = 'Χειμερινό Εξάμηνο ' +  dateParts[0] + ' - ' + (parseInt(dateParts[0]) + 1) ;
                                else
                                    string = 'Εαρινό Εξάμηνο ' + (parseInt(dateParts[0]) - 1) + ' - ' + dateParts[0];


                                

                                let background = ( (index % 2) ? ("odd") : ("") );
                                index++;

                                return (
                                    <li key={item.Id} className={background}>
                                        {string}
                                        <button key={item.Id} onClick={this.handleOpenApplication}>
                                            <img /*src="../images/magnifying_glass.svg"*//>
                                        </button>
                                    </li>
                                );
                            }
                        })
                    })
                }
            });
        }

        autoBind(this);
    }

    handleOpenApplication() {

    }

    render() {
        return(
            <div className={"StudentApplicationList " + this.state.pos}>
                <h2>{this.state.title}</h2>
                <ul>
                    {this.state.list != null ? this.state.list : ''}
                </ul>
            </div>
        );
    }
}

function StudentHelp(props) {
    return(
        <div className="StudentHelp">
            <h1>Οδηγίες - Βοήθεια</h1>
            <div className="line"/>

            <ul>
                <li>
                    Ως Φοιτητής δικαιούστε ένα σύγγραμμα ανά μάθημα που παρακολουθείτε.<br/>
                    <Link to='/actionpage/Student/0' id="Link">Ξεκινήστε τη δήλωσή σας</Link> 
                </li>

                <li>
                    Εάν έχετε λογαριασμό, μπορείτε να <Link to='/actionpage/Student/1' id='Link'>προβάλλετε</Link> τις προηγούμενες, καθώς και την τρέχουσα, δηλώσεις σας.
                </li>
            </ul>

        </div>
    );
}
