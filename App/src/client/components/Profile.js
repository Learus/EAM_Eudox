import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import Header from './Header'
import autobind from 'react-autobind';
import axios from 'axios';
import '../css/Profile.css';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        autobind(this);
        this.state = { user: null }
    }

    componentDidMount() {
        let username;
        let user = sessionStorage.getItem('EudoxusUser');
        if(user) {
            username = JSON.parse(sessionStorage.getItem('EudoxusUser')).Username;

            axios.post('/api/getUser', {
                        username: username
                }).then( res => {
                    if (res.data.error) {
                        alert(res.message)
                    }
                    else {
                        this.setState( { user: res.data.data } );
                    }
            });
        }
    }

    render() {

        let lineClass = "line ";
        let h1Class = "";

        console.log(this.state.user)

        if(this.state.user)
        {
            lineClass += this.state.user.Type + "Line";
            h1Class += this.state.user.Type + "H1";

            return(
                <div>
                    <Header/>
                    <div className="PageInfo">
    
                        <h1 className={h1Class}>Τα στοιχεία μου</h1>
    
                        <div className={lineClass}/>
    
                        <div className="Wrapper">
                            <DataPresenter  className="DataPresenter StudentPresenter"
                                            header="Όνομα Χρήστη"
                                            data={this.state.user.Username}/>
    
                            <DataPresenter  className="DataPresenter StudentPresenter"
                                            header="Email"
                                            data={this.state.user.Email}/>
                            
                            <button >Αλλαγή Κωδικού</button>
    
                            <SpecificUserDetails user={this.state.user}/>
                        </div>

                    </div>
                </div>
            );
        }
        
        return(
            <div>
                <Header/>
                <div className="PageInfo">

                    <h1 className={h1Class}>Τα στοιχεία μου</h1>

                    <div className={lineClass}/>

                    <h2>Για να δείτε τα στοιχεία σας πρέπει να είστε συνδεδεμένος στον λογαριασμό σας</h2>

                </div>
            </div>
        );
    }
}

function SpecificUserDetails(props) {

    switch(props.user.Type)
    {
        case 'Student': return(<StudentSpecificDetails user={props.user}/>); break;
        case 'Publisher': return(<PublisherSpecificDetails user={props.user}/>); break;
        case 'Secretary': return(<SecretarySpecificDetails user={props.user}/>); break;
        case 'Distributor': return(<DistributorSpecificDetails user={props.user}/>); break;
    }
}

class StudentSpecificDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            user: props.user,
            name: "",
            surname: "",
            phone: "",
            sid: "",
            pid: "",
            department_name: ""
        };
    }

    componentDidMount() {
        axios.post('/api/getStudent',
        { username: this.state.user.Username }
        ).then( res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                let student = res.data.data;

                axios.post('/api/getDepartmentData',
                { udid: student.University_Department_Id }
                ).then( res => {
                    if(res.data.error) {
                        alert(res.message);
                    }
                    else {
                        this.setState( {department_name: res.data.data.Name} )
                    }
                });

                this.setState( {
                    name: student.Name,
                    surname: student.Surname,
                    phone: student.Phone,
                    sid: student.Student_Id,
                    pid: student.Personal_Id,
                } );
            }
        })
    }

    render() {
        return(
            <div>
                
                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Όνομα - Επώνυμο"
                                data={this.state.name + " " + this.state.surname}/>

                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Τηλέφωνο Επικοινωνίας"
                                data={this.state.phone}/>

                
                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Αναγνωριστικός Αριθμός Φοιτητή"
                                data={this.state.sid}/>


                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Αριθμός Ταυτότητας"
                                data={this.state.pid}/>


                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Τμήμα"
                                data={this.state.department_name}/>

            </div>
        );
    }
}

function DataPresenter(props) {
    return(
        <div className={props.className}>
            <h3>{props.header}</h3>
            <h2>{props.data}</h2>
        </div>
    );
}


class PublisherSpecificDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user };
    }

    render() {
        return(
            <div></div>
        );
    }
}

class SecretarySpecificDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user };
    }

    render() {
        return(
            <div></div>
        );
    }
}

class DistributorSpecificDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user };
    }

    render() {
        return(
            <div></div>
        );
    }
}
