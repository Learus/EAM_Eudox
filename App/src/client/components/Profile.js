import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import Header from './Header'
import autobind from 'react-autobind';
import axios from 'axios';
import '../css/Profile.css';
import FormTextInput from './Utilities';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: null, 
            savedNewMail: "", 
            savedNewMail2: "", 
            savedNewPassword: "", 
            savedNewPassword2: "",
            wrongEmail: "",
            wrongPassword: "",
            wrongCurrentPassword: "" }
        autobind(this);
    }

    componentDidMount() {
        this.updateUser();
    }

    signalLoggedStatus() {
        this.updateUser();
    }

    updateUser() {
        let user = sessionStorage.getItem('EudoxusUser');
        if(user) {

            this.setState({
                user: JSON.parse(user)
            })
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
                        
                        let user = JSON.parse(sessionStorage.getItem('EudoxusUser'));

                        user.Email = this.state.savedNewMail;
                        sessionStorage.setItem('EudoxusUser', JSON.stringify(user) );
                        this.setState( { savedNewMail: "", savedNewMail2: "", user: user, wrongEmail: "" } );
                    }
                });
            }
            else
            {
                alert("Σφάλμα: Πρέπει να εισάγετε μια διεύθυνση E-mail πρώτα.");
                this.setState({
                    wrongEmail: "Σφάλμα: Πρέπει να εισάγετε μια διεύθυνση E-mail πρώτα."
                })
            }
        }
        else
        {
            alert("Σφάλμα: Οι διευθύνσεις E-mail που έχετε εισάγει δεν ταιριάζουν.");
            this.setState({
                wrongEmail: "Σφάλμα: Οι διευθύνσεις E-mail που έχετε εισάγει δεν ταιριάζουν."
            })
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
            
            if(this.state.savedNewPassword !== "")
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
                        this.setState( { savedNewPassword: "", savedNewPassword2: "", savedCurrentPassword: "", wrongPassword: "" } );
                        this.updateUser();
                    }
                });
            }
            else
            {
                alert("Σφάλμα: Πρέπει να εισάγετε έναν νέο κωδικό πρώτα.");
                this.setState({
                    wrongPassword: res.message
                })
            }
        }
        else
        {
            if(this.state.savedCurrentPassword !== this.state.user.Password) {
                alert("Σφάλμα: Ο τρέχων κωδικός που έχετε εισάγει είναι εσφαλμένος.");
                this.setState({
                    wrongCurrentPassword: "Σφάλμα: Ο τρέχων κωδικός που έχετε εισάγει είναι εσφαλμένος."
                })
            }
            else {
                alert("Σφάλμα: Οι νέοι κωδικοί που έχετε εισάγει δεν ταιριάζουν.");
                this.setState({
                    wrongPassword: "Σφάλμα: Οι νέοι κωδικοί που έχετε εισάγει δεν ταιριάζουν."
                })
            }

            
        }
    }

    render() {

        let lineClass = "line ";
        let h1Class = "";
        
        // console.log(this.state);

        if(this.state.user)
        {
            lineClass += this.state.user.Type + " Line";
            h1Class += this.state.user.Type + " H1";
            let presenterClass = "DataPresenter " + this.state.user.Type + "Presenter";
            return(
                <div>
                    <Header signalLoggedStatus={this.signalLoggedStatus}/>
                    
                    <div className="Profile">
    
                        <h1 className={h1Class}>Τα στοιχεία μου</h1>
    
                        {/* <div className={lineClass}/> */}
    
                        <div style={{float: 'left', marginLeft: '100px'}}>

                            <DataPresenter  className={presenterClass}
                                            header="Γενικά Στοιχεία"/>

                            <DataPresenter  className={presenterClass + " subPresenter"}
                                            header="Όνομα Χρήστη"
                                            data={this.state.user.Username}/>
                            
                            

                            <DataPresenter  className={presenterClass + " subPresenter"}
                                            header="E-mail"
                                            data={this.state.user.Email}/>
                            
                            <br/>
                        </div>

                        <SpecificUserDetails user={this.state.user} style={{float: 'left', marginLeft: '100px'}}/>

                        <div style={{float: 'left', marginLeft: '100px'}}>
                            <DataPresenter  className={presenterClass}
                                            header="Αλλαγή E-mail"
                                            data=""/>

                            <FormTextInput  label="Νέο E-mail"
                                            title={this.state.wrongEmail}
                                            className={this.state.wrongEmail.length !== 0 ? "ProfileInput wrong" : "ProfileInput"}
                                            labelClass={this.state.user.Type}
                                            type="Text"
                                            placeholder="Νεο E-mail"
                                            onChange={this.hMailChange}/>

                            <FormTextInput  label="Επιβεβαίωση Νέου E-mail"
                                            title={this.state.wrongEmail}
                                            className={this.state.wrongEmail.length !== 0 ? "ProfileInput wrong" : "ProfileInput"}
                                            labelClass={this.state.user.Type}
                                            type="Text"
                                            placeholder="Επιβεβαίωση Νέου E-mail"
                                            onChange={this.hMailChange2}/>

                            <button className={this.state.user.Type} onClick={this.hMailSubmit}>Επιβεβαίωση</button>

                        </div>

                        <div style={{float: 'left', marginLeft: '100px'}}>
                            <DataPresenter  className={presenterClass}
                                            header="Αλλαγή Κωδικού Πρόσβασης"
                                            data=""/>

                            <FormTextInput  label="Παλιός Κωδικός Πρόσβασης"
                                            title="Παλιός Κωδικός Πρόσβασης"
                                            className={this.state.wrongCurrentPassword.length !== 0 ? "ProfileInput wrong" : "ProfileInput"}
                                            labelClass={this.state.user.Type}
                                            type="Text"
                                            placeholder="Παλιός Κωδικός Πρόσβασης"
                                            onChange={this.hCurrentPassword}/>
                            
                            <FormTextInput  label="Νέος Κωδικός Πρόσβασης"
                                            title="Νεος Κωδικός Πρόσβασης"
                                            className={this.state.wrongPassword.length !== 0 ? "ProfileInput wrong" : "ProfileInput"}
                                            labelClass={this.state.user.Type}
                                            type="password"
                                            placeholder="Νεος Κωδικός Πρόσβασης"
                                            onChange={this.hNewPassword}/>

                            <FormTextInput  label="Επιβεβαίωση Νεου Κωδικού Πρόσβασης"    
                                            title="Επιβεβαίωση Νεου Κωδικού Πρόσβασης"
                                            className={this.state.wrongPassword.length !== 0 ? "ProfileInput wrong" : "ProfileInput"}
                                            labelClass={this.state.user.Type}
                                            type="password"
                                            placeholder="Επιβεβαίωση Νεου Κωδικού Πρόσβασης"
                                            onChange={this.hNewPassword2}/>
                            
                            <button className={this.state.user.Type} onClick={this.hPasswordSubmit}>Επιβεβαίωση</button>
                        </div>

                    </div>
                </div>
            );
        }
        
        return(
            <div>
                <Header signalLoggedStatus={this.signalLoggedStatus}/>
                <div className="Profile">

                    <h1 className="H1">Τα στοιχεία μου</h1>

                    <div className="Line"/>

                    <h2>Για να δείτε τα στοιχεία σας πρέπει να είστε συνδεδεμένος στον λογαριασμό σας.</h2>

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
        case 'PublDist': return(<PublisherSpecificDetails user={props.user} style={props.style}/>);;
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
            style: props.style,
            editing: false,
            wrongPhone: "",
            wrongSid: "",
            wrongPid: ""
        };

        autobind(this);
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

    hEdit() {

        let dontPost = false;
        if(this.state.editing)
        {

            if(this.state.phone.length !== 10)
            {
                this.setState( {wrongPhone: "Ο αριθμός τηλεφώνου είναι δεκαψήφιος."} )
                dontPost = true;
            }
            else
                this.setState({wrongPhone: ""})

            if(this.state.sid.length !== 12)
            {
                this.setState({ wrongSid: "Ο αριθμός φοιτητικής ταυτότητας είναι δωδεκαψήφιος." })
                dontPost = true;
            }
            else
                this.setState({wrongSid: ""})
            
            if(this.state.pid.length !== 8)
            {
                this.setState({ wrongPid: "Ο αριθμός ταυτότητας είναι οκταψήφιος." })
                dontPost = true;
            }
            else
                this.setState({wrongPid: ""})

            if(dontPost) return;

            if( !(this.state.oldPhone === this.state.phone &&
                this.state.oldSid === this.state.sid &&
                this.state.oldPid === this.state.pid) ) {

                    axios.post('/api/updateStudentDetails', {
                        sid: this.state.sid,
                        pid: this.state.pid,
                        phone: this.state.phone,
                        username: this.state.user.Username
                    })

                }



        }
        else
        {
            this.setState({
                oldPhone: this.state.phone,
                oldSid: this.state.sid,
                oldPid: this.state.pid
            });
        }

        this.setState( { editing: !this.state.editing } );
    }

    hPhoneChange(event) {
        this.setState( {phone: event.target.value} );
    }

    hSidChange(event) {
        this.setState( {sid: event.target.value} );
    }

    hPidChange(event) {
        this.setState( {pid: event.target.value} );
    }

    render() {
        if(!this.state.editing)
            return(
                <div style={this.state.style}>

                    <DataPresenter  className="DataPresenter StudentPresenter"
                                    header="Ειδικά Στοιχεία"/>
                    
                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Όνομα - Επώνυμο"
                                    data={this.state.name + " " + this.state.surname}/>
                    

                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Τηλέφωνο Επικοινωνίας"
                                    data={this.state.phone}/>

                    
                    
                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Αριθμός Φοιτητικής Ταυτότητας"
                                    data={this.state.sid}/>

                    

                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Αριθμός Ταυτότητας"
                                    data={this.state.pid}/>

                    

                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Τμήμα"
                                    data={this.state.department_name}/>

                    <button className={`${this.state.user.Type} StudentEdit`} onClick={this.hEdit}>Επεξεργασία</button>

                </div>
            );
        else
            return(
                <div style={this.state.style}>

                    <DataPresenter  className="DataPresenter StudentPresenter"
                                    header="Ειδικά Στοιχεία"/>
                    
                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Όνομα - Επώνυμο"
                                    data={this.state.name + " " + this.state.surname}/>
                    

                    <FormTextInput  label="Τηλέφωνο Επικοινωνίας"
                                    title={this.state.wrongPhone}
                                    className={ this.state.wrongPhone ? "ProfileInput wrong" : "ProfileInput" }
                                    labelClass={this.state.user.Type}
                                    type="Number"
                                    placeholder="Τηλέφωνο Επικοινωνίας"
                                    onChange={this.hPhoneChange}
                                    value={this.state.phone}/>

                    
                    
                    <FormTextInput  label="Αριθμός Φοιτητικής Ταυτότητας"
                                    title={this.state.wrongSid}
                                    className= { this.state.wrongSid ? "ProfileInput wrong" : "ProfileInput" }
                                    labelClass={this.state.user.Type}
                                    type="Number"
                                    placeholder="Αριθμός Φοιτητικής Ταυτότητας"
                                    onChange={this.hSidChange}
                                    value={this.state.sid}/>

                    

                    <FormTextInput  label="Αριθμός Ταυτότητας"
                                    title={this.state.wrongPid}
                                    className={ this.state.wrongPid ? "ProfileInput wrong" : "ProfileInput"}
                                    labelClass={this.state.user.Type}
                                    type="Text"
                                    placeholder="Αριθμός Ταυτότητας"
                                    onChange={this.hPidChange}
                                    value={this.state.pid}/>


                    <DataPresenter  className="DataPresenter StudentPresenter subPresenter"
                                    header="Τμήμα"
                                    data={this.state.department_name}/>

                    <button className={`${this.state.user.Type} PublisherEdit`} onClick={this.hEdit}>Επιβεβαίωση</button>
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
            city: "",
            street: "",
            street_number: "",
            zipcode: "",
            style: props.style,
            editing: false,
            wrongPhone: "",
            wrongZipcode: ""
         };

         autobind(this);
    }

    componentDidMount() {

        axios.post('/api/getTypeData', { username: this.state.user.Username, type: "Publisher" }).then( res => {
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
                            street: res2.data.data.Street_Name,
                            street_number: res2.data.data.Street_Number,
                            city: res2.data.data.City,
                            zipcode: res2.data.data.ZipCode
                        } );
                    }
                });
        }

        });
    }

    hEdit() {
        let dontpost = false;
        if(this.state.editing)
        {
            if(this.state.zipcode.length > 11 || this.state.zipcode.length < 5)
            {
                console.log(this.state.zipcode)
                this.setState( {
                    wrongZipcode: "Λανθασμένος Τ.Κ."
                } );
                dontpost = true;
            }
            else
                this.setState( { wrongZipcode: "" } );

            if(this.state.phone.length !== 10)
            {
                this.setState( {
                    wrongPhone: "Το τηλεφωνο πρέπει να έχει 10 αριθμούς."
                } );
                dontpost = true;
            }
            else
                this.setState( { wrongPhone: "" } );

            if (dontpost) return;
            
            if( !( this.state.name === this.state.oldName &&  this.state.phone === this.state.oldPhone &&
                this.state.street === this.state.oldStreet && this.state.street_number === this.state.oldStreetNumber &&
                this.state.city === this.state.oldCity && this.state.zipcode === this.state.oldZipcode ) )
            {
                axios.post('/api/updatePublisherDetails',
                {
                    username: this.state.user.Username,
                    name: this.state.name,
                    phone: this.state.phone,
                    street: this.state.street,
                    street_number: this.state.street_number,
                    city: this.state.city,
                    zipcode: this.state.zipcode
                })
            }
        }
        else
        {
            this.setState({
                oldName: this.state.name,
                oldPhone: this.state.phone,
                oldStreet: this.state.street,
                oldStreetNumber: this.state.street_number,
                oldCity: this.state.city,
                oldZipcode: this.state.zipcode
            });
        }

        this.setState({
            editing: !this.state.editing,
            wrongPhone: "",
            wrongZipcode: "",
        });
    }

    hPublisherNameChange(event) {
        this.setState({name: event.target.value});
    }

    hPhoneChange(event) {
        this.setState({phone: event.target.value});
    }

    hCityChange(event) {
        this.setState({city: event.target.value});
    }

    hStreetChange(event) {
        this.setState({street: event.target.value});
    }

    hStreetNumberChange(event) {
        this.setState({street_number: event.target.value});
    }

    hZipChange(event) {
        this.setState( {zipcode: event.target.value} );
    }

    render() {
        if(!this.state.editing)
            return(
                <div style={this.state.style}>
                    
                    <DataPresenter  className="DataPresenter PublisherPresenter"
                                    header="Ειδικά Στοιχεία"/>

                    <DataPresenter  className="DataPresenter PublisherPresenter subPresenter"
                                    header="Όνομα Εκδοτικού Οίκου"
                                    data={this.state.name}/>

                    <DataPresenter  className="DataPresenter PublisherPresenter subPresenter"
                                    header="Τηλέφωνο Επικοινωνίας"
                                    data={this.state.phone}/>

                    
                    <DataPresenter  className="DataPresenter PublisherPresenter subPresenter"
                                    header="Διεύθυνση"
                                    data={`${this.state.street} ${this.state.street_number}, ${this.state.city}`}/>


                    <DataPresenter  className="DataPresenter PublisherPresenter subPresenter"
                                    header="Ταχυδρομικός Κώδικας"
                                    data={this.state.zipcode}/>

                    <button className={`${this.state.user.Type} PublisherEdit`} onClick={this.hEdit}>Επεξεργασία</button>
                </div>
            );
        else
            return(
                <div style={this.state.style}>
                    
                    <DataPresenter  className="DataPresenter PublisherPresenter"
                                    header="Ειδικά Στοιχεία"/>

                    <FormTextInput  label="Όνομα Εκδοτικού Οίκου"
                                    title="Όνομα Εκδοτικού Οίκου"
                                    className="ProfileInput"
                                    labelClass={this.state.user.Type}
                                    type="Text"
                                    placeholder="Όνομα Εκδοτικού Οίκου"
                                    onChange={this.hPublisherNameChange}
                                    value={this.state.name}/>

                    <FormTextInput  label="Τηλέφωνο Επικοινωνίας"
                                    title={this.state.wrongPhone}
                                    className={this.state.wrongPhone ? "ProfileInput wrong" : "ProfileInput" }
                                    labelClass={this.state.user.Type}
                                    type="Number"
                                    placeholder="Τηλέφωνο Επικοινωνίας"
                                    onChange={this.hPhoneChange}
                                    value={this.state.phone}/>

                    <FormTextInput  label="Οδός"
                                    title="Οδός"
                                    className="ProfileInput"
                                    labelClass={this.state.user.Type}
                                    type="Text"
                                    placeholder="Οδός"
                                    onChange={this.hStreetChange}
                                    value={this.state.street}/>
                    
                    <FormTextInput  label="Αριθμός"
                                    title="Αριθμός"
                                    className="ProfileInput"
                                    labelClass={this.state.user.Type}
                                    type="Number"
                                    placeholder="Αριθμός"
                                    onChange={this.hStreetNumberChange}
                                    value={this.state.street_number}/>


                    <FormTextInput  label="Πόλη"
                                    title="Πόλη"
                                    className="ProfileInput"
                                    labelClass={this.state.user.Type}
                                    type="Text"
                                    placeholder="Πόλη"
                                    onChange={this.hCityChange}
                                    value={this.state.city}/>
                    
                    <FormTextInput  label="Ταχυδρομικός Κώδικας"
                                    title={this.state.wrongZipcode}
                                    className={this.state.wrongZipcode ? "ProfileInput wrong" : "ProfileInput" }
                                    labelClass={this.state.user.Type}
                                    type="Number"
                                    placeholder="Ταχυδρομικός Κώδικας"
                                    onChange={this.hZipChange}
                                    value={this.state.zipcode}/>

                    <button className={`${this.state.user.Type} PublisherEdit`} onClick={this.hEdit}>Επιβεβαίωση</button>
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
