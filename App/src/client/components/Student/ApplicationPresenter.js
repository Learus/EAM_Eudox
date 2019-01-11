import React, {Component} from 'react';
import { Link, browserHistory } from "react-router";
import Popup from 'reactjs-popup';
import ReactToPrint from 'react-to-print';
import {TextbookSearchDisplay} from '../Search';

import '../../css/Student/ApplicationPresenter.css';
import searchimg from '../../images/search.png'
import autoBind from 'react-autobind';
import axios from 'axios';

export default function StudentApplications(props) {

    let username = null;
    let user = JSON.parse(sessionStorage.getItem('EudoxusUser'));

    if(user && user.Type === 'Student')
    {
        username = user.Username;

        return(
            <div className="StudentApplications">
                <h1>Οι Δηλώσεις Μου</h1>
                <div className = "line"/>

                <StudentApplicationList username={username} title="Τρέχουσα Δήλωση" showCurrent={true}/>
                <StudentApplicationList username={username} title="Προηγούμενες Δηλώσεις" showCurrent={false}/>

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

export function TextbookPopup(props) {
    const tb = props.data;
    const elig = tb.taht.Taken ? "Ineligible" : "Eligible";
    const title = tb.taht.Taken ? "Το σύγγραμμα αυτό έχει ήδη παρθεί ή η προθεσμία έχει λήξει" : null
    return (
        <Popup 
            className = "TextbookPopup"
            trigger = { open => (
                <div title={title} className={open ? `TextbookPopupButton Open ${props.className}` : `TextbookPopupButton Closed ${props.className}`}>
                    <p className="ApplicationPopupEntryName">{tb.t.Name}</p>
                    <p className="ApplicationPopupEntryCourse">{tb.c.Name} - {tb.c.Semester}o Εξάμηνο</p>
                    <div className={elig}/>
                </div>
            )}
            closeOnDocumentClick
            on="hover"
            position="right center"
            arrow={true}
        >
            <div className="TextbookPopupContent">
                <h3>{tb.t.Name}</h3>

                <div className="line"/>

                <div className="AllContent">
                    <div className="Info Content">  
                        <h4>Στοιχεία</h4>  
                        <p>{tb.t.Writer}</p>
                        <p>{tb.t.Date_Published.split('-')[0]}</p>
                        <p>ISBN: {tb.t.ISBN}</p>
                        <p>{tb.p.Name}</p>
                    </div>
                        
                    <div onClick={() => {
                        var win = window.open(`https://www.google.com/maps/search/?api=1&query=
                        ${tb.a.Street_Name}+${tb.a.Street_Number}%2C+${tb.a.City}+${tb.a.ZipCode}`);
                        win.focus();
                    }} className="Distributor Content" title='Ανοίξτε στο Google-Maps'>
                        <h4>Σημείο Διανομής</h4>
                        <p>{tb.dp.Name}</p>
                        <p>{tb.a.Street_Name} {tb.a.Street_Number}, {tb.a.City} {tb.a.ZipCode}</p>
                        <p>{tb.dp.Phone}</p>
                        <p>{tb.dp.Working_Hours}</p>
                        <p>{tb.dpht.Copies + " Αντίτυπα"}</p>
                    </div>
                </div>
                
            </div>
            
        </Popup>
    )
}

class ApplicationPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textbooks: []
        }
    }



    componentDidMount() {
        axios.post('/api/getTextbookApplication', {
            user: this.props.user,
            id: this.props.data.Id
        })
        .then(res => {
            if (res.data.error) {
                console.log(res.data.message);
            }
            else {
                this.setState({
                    textbooks: res.data.data
                })
            }
        })
    }

    render() {
        const textbooks = this.state.textbooks.map( (tb, index) => {
            const even = index % 2 === 0 ? "Even": "Odd"
            return <TextbookPopup key={tb.c.Id} className={`ApplicationPopupEntry ${even}`} data={tb} />
        })

        // if (textbooks.length !== 0)
            return (
                <Popup 
                    className = "ApplicationPopup"
                    trigger = { open => (
                        <button onClick={this.props.onClick} 
                                className={open ? `ApplicationPopupButton Open ${this.props.className}` : `ApplicationPopupButton Closed ${this.props.className}`}
                                title={this.props.title}>
                            {this.props.label}
                        </button>
                    )}
                    closeOnDocumentClick
                    on="hover"
                    position="right center"
                    arrow={true}
                >
                    <div>
                        <button className="PrintButton" onClick = {
                            () => {
                                sessionStorage.setItem("EudoxusPrintApplication", JSON.stringify(this.state.textbooks))
                                browserHistory.push('/print');
                            }
                        }>
                            Εκτύπωση Δήλωσης
                        </button>
                        
                        {textbooks}
                    </div>
                    
                </Popup>
            )
        // return null;
    }
}

class StudentApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        autoBind(this);
    }

    componentDidMount() {
        if(this.props.username)
        {
            axios.post('/api/getStudentApplications', {
                username: this.props.username
            }).then( res => {
                if (res.data.error) {
                    console.error(res.data.message);
                }
                else {
                    let index = 0;
                    this.setState({
                        list: res.data.data.map( (item) => {
                            if( (!this.props.showCurrent && !item.Is_Current)  || (item.Is_Current && this.props.showCurrent)  ) {

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
                                    <ApplicationPopup 
                                        user={this.props.username} 
                                        data={item} key={item.Id} 
                                        className={background} 
                                        label={string}
                                        title={this.props.showCurrent ? "Πατήστε για τροποποίηση" : null} 
                                        onClick= { this.props.showCurrent ? () => {browserHistory.push(`/actionpage/Student/0`)} : null }
                                        position={this.props.pos} />
                                );
                            }
                        })
                    })
                }
            });
        }
    }

    render() {
        return(
            <div className={"StudentApplicationList " + this.props.pos}>
                <h2>{this.props.title}</h2>
                <div>
                    {this.state.list != null ? this.state.list : ''}
                </div>
            </div>
        );
    }
}