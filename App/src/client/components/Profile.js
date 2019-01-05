import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import Header from './Header'
import autobind from 'react-autobind';
import axios from 'axios';
import '../css/Profile.css';
import {FormTextInput} from './Utilities';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { user: null, savedNewMail: "", savedNewMail2: "", savedNewPassword: "", savedNewPassword2: "" }
        autobind(this);
    }

    componentDidMount() {
        this.updateUser();
    }

    signalLoggedStatus() {
        this.updateUser();
    }

    updateUser() {
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
        else
            this.setState( {user: null} );
    }

    hMailChange(event) {
        this.setState( {savedNewMail: event.target.value} );
    }

    hMailChange2(event) {
        this.setState( {savedNewMail2: event.target.value} );
    }

    hMailSubmit() {
        if( this.state.savedNewMail === this.state.savedNewMail2)
        {   
            if( this.state.savedNewMail != "" )
            {

                axios.post('/api/updateUser',
                { 
                    username: this.state.user.Username,
                    email: this.state.savedNewMail 
                }).then( res => {
                    if (res.data.error) {
                        alert(res.message)
                    }
                    else {
                        this.setState( { savedNewMail: "", savedNewMail2: "" } );
                        this.updateUser();
                    }
                });
            }
            else
            {
                alert("Σφάλμα: Πρέπει να εισάγετε μια διεύθυνση E-mail πρώτα.");
            }
        }
        else
        {
            alert("Σφάλμα: Οι διευθύνσεις E-mail που έχετε εισάγει δεν ταιριάζουν.");
        }
    }

    hCurrentPassword(event) {
        this.setState( {savedCurrentPassword: event.target.value} );
    }

    hNewPassword(event) {
        this.setState( {savedNewPassword: event.target.value} );
    }

    hNewPassword2(event) {
        this.setState( {savedNewPassword2: event.target.value} );
    }

    hPasswordSubmit() {

        if( this.state.savedCurrentPassword === this.state.user.Password &&
            this.state.savedNewPassword === this.state.savedNewPassword2 ) {
            
            if(this.state.savedNewPassword != "")
            {

                axios.post('/api/updateUser',
                { 
                    username: this.state.user.Username,
                    password: this.state.savedNewPassword 
                }).then( res => {
                    if (res.data.error) {
                        alert(res.message)
                    }
                    else {
                        this.setState( { savedNewPassword: "", savedNewPassword2: "", savedCurrentPassword: "" } );
                        this.updateUser();
                    }
                });
            }
            else
            {
                alert("Σφάλμα: Πρέπει να εισάγετε έναν νέο κωδικό πρώτα.");
            }
        }
        else
        {
            if(this.state.savedCurrentPassword != this.state.user.Password)
                alert("Σφάλμα: Ο τρέχων κωδικός που έχετε εισάγει είναι εσφαλμένος.");
            else
                alert("Σφάλμα: Οι νέοι κωδικοί που έχετε εισάγει δεν ταιριάζουν.");
        }
    }

    render() {

        let lineClass = "line ";
        let h1Class = "";
        
        //console.log(this.state);

        if(this.state.user)
        {
            lineClass += this.state.user.Type + "Line";
            h1Class += this.state.user.Type + "H1";
            let presenterClass = "DataPresenter " + this.state.user.Type + "Presenter";

            return(
                <div>
                    <Header signalLoggedStatus={this.signalLoggedStatus}/>
                    
                    <div className="PageInfo">
    
                        <h1 className={h1Class}>Τα στοιχεία μου</h1>
    
                        <div className={lineClass}/>
    
                        <div style={{float: 'left', marginLeft: '100px'}}>
                            <DataPresenter  className={presenterClass}
                                            header="Όνομα Χρήστη"
                                            data={this.state.user.Username}/>
                            
                            <br/>

                            <DataPresenter  className={presenterClass}
                                            header="E-mail"
                                            data={this.state.user.Email}/>
                            
                            <DataPresenter  className={presenterClass}
                                            header="Αλλαγή E-mail"
                                            data=""/>

                            <FormTextInput  title="Νεο E-mail"
                                            className=""
                                            type="Text"
                                            placeHolder="Νεο E-mail"
                                            onChange={this.hMailChange}/>

                            <FormTextInput  title="Επιβεβαίωση Νέου E-mail"
                                            className=""
                                            type="Text"
                                            placeHolder="Επιβεβαίωση Νέου E-mail"
                                            onChange={this.hMailChange2}/>

                            <button onClick={this.hMailSubmit}>Επιβεβαίωση</button>


                            <DataPresenter  className={presenterClass}
                                            header="Αλλαγή Κωδικού Πρόσβασης"
                                            data=""/>
                            
                            <FormTextInput  title="Τρέχων Κωδικός Πρόσβασης"
                                            className=""
                                            type="Text"
                                            placeHolder="Τρέχων Κωδικός Πρόσβασης"
                                            onChange={this.hCurrentPassword}/>

                            <FormTextInput  title="Νεος Κωδικός Πρόσβασης"
                                            className=""
                                            type="Text"
                                            placeHolder="Νεος Κωδικός Πρόσβασης"
                                            onChange={this.hNewPassword}/>

                            <FormTextInput  title="Επιβεβαίωση Νεου Κωδικού Πρόσβασης"
                                            className=""
                                            type="Text"
                                            placeHolder="Επιβεβαίωση Νεου Κωδικού Πρόσβασης"
                                            onChange={this.hNewPassword2}/>
                            
                            <button onClick={this.hPasswordSubmit}>Επιβεβαίωση</button>


                        </div>

                        <SpecificUserDetails user={this.state.user} style={{float: 'right', marginRight: '100px'}}/>

                    </div>
                </div>
            );
        }
        
        return(
            <div>
                <Header signalLoggedStatus={this.signalLoggedStatus}/>
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
        case 'Student': return(<StudentSpecificDetails user={props.user} style={props.style}/> ); break;
        case 'Publisher': return(<PublisherSpecificDetails user={props.user} style={props.style}/>); break;
        case 'Secretary': return(<SecretarySpecificDetails user={props.user} style={props.style}/>); break;
        case 'Distributor': return(<DistributorSpecificDetails user={props.user} style={props.style}/>); break;
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
            department_name: "",
            style: props.style
        };
    }

    componentDidMount() {
        axios.post('/api/getTypeData',
        { username: this.state.user.Username, type: this.state.user.Type }
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
            <div style={this.state.style}>
                
                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Όνομα - Επώνυμο"
                                data={this.state.name + " " + this.state.surname}/>
                <br/>

                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Τηλέφωνο Επικοινωνίας"
                                data={this.state.phone}/>

                <br/>   
                
                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Αναγνωριστικός Αριθμός Φοιτητή"
                                data={this.state.sid}/>

                <br/>

                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Αριθμός Ταυτότητας"
                                data={this.state.pid}/>

                <br/>

                <DataPresenter  className="DataPresenter StudentPresenter"
                                header="Τμήμα"
                                data={this.state.department_name}/>

            </div>
        );
    }
}

class PublisherSpecificDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: props.user,
            name: "",
            phone: null,
            address: "",
            zipcode: "",
            style: props.style
         };
    }

    componentDidMount() {

        axios.post('/api/getTypeData', { username: this.state.user.Username, type: this.state.user.Type }).then( res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {

                axios.post('/api/getAddress', { id: res.data.data.Address_Id }).then( res2 => {
                    if (res2.data.error) {
                        alert(res.message)
                    }
                    else {
                        this.setState( {
                            name: res.data.data.Name,
                            phone: res.data.data.Phone,
                            address: `${res2.data.data.Street_Name} ${res2.data.data.Street_Number}, ${res2.data.data.City}`,
                            zipcode: res2.data.data.ZipCode
                        } );
                    }
                });
        }

        });
    }

    render() {

        //console.log(this.state.user);

        return(
            <div style={this.state.style}>
                
                <DataPresenter  className="DataPresenter PublisherPresenter"
                                header="Όνομα Εκδοτικού Οίκου"
                                data={this.state.name}/>

                <DataPresenter  className="DataPresenter PublisherPresenter"
                                header="Τηλέφωνο Επικοινωνίας"
                                data={this.state.phone}/>

                
                <DataPresenter  className="DataPresenter PublisherPresenter"
                                header="Διεύθυνση"
                                data={this.state.address}/>


                <DataPresenter  className="DataPresenter PublisherPresenter"
                                header="Ταχυδρομικός Κώδικας"
                                data={this.state.zipcode}/>

            </div>
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
