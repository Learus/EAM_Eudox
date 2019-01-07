import React, {Component} from 'react';
import { Link, browserHistory } from "react-router";

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

                <StudentApplicationList username={username} title="Τρέχουσα Δήλωση" showCurrent={true} pos="left"/>
                <StudentApplicationList username={username} title="Προηγούμενες Δηλώσεις" showCurrent={false} pos="right"/>

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
                                    <div key={item.Id} className={background}>
                                        {string}
                                        <button className="SearchButton" key={item.Id} onClick={this.handleOpenApplication}>
                                            <img className="SearchImg" src={searchimg}/>
                                        </button>
                                    </div>
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
                <div>
                    {this.state.list != null ? this.state.list : ''}
                </div>
            </div>
        );
    }
}