import React, { Component } from 'react';
import LoginPopup from './Login';
import Header from './Header';
import '../css/Signup.css';
import axios from 'axios';
import autoBind from 'react-autobind';
import { browserHistory } from 'react-router';
import Actions from './Actions';
import FormTextInput, {ComboDropdown} from './Utilities';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            base: {
                username: '',
                email: '',
                password: '', 
                repassword: '',
                type: '',

                wrongUsernameMsg: '',
                wrongEmailMsg: '',
                wrongRepasswordMsg: '',
                wrongPasswordMsg: '',
                wrongTypeMsg: ''
            },
            spec: {}
        };

        autoBind(this);
    }

    signalLoggedStatus() {}

    //#region Base Handlers

    handleUsernameChange(event) {
        let newBase = this.state.base;
        newBase.username = event.target.value;
        this.setState({base: newBase});
    }

    handleEmailChange(event) {
        let newBase = this.state.base;
        newBase.email = event.target.value;
        this.setState({base: newBase});
    }

    handlePasswordChange(event) {
        let newBase = this.state.base;
        newBase.password = event.target.value;
        this.setState({base: newBase});
    }

    handleRepasswordChange(event) {
        let newBase = this.state.base;
        newBase.repassword = event.target.value;
        this.setState({base: newBase});
    }

    handleTypeChange(event) {
        let newBase = this.state.base;
        newBase.type = event.value;
        switch(event.value) {
			
            case "Student":
                this.setState({
                    base: newBase,
                    spec: {
                        name: '',
                        wrongNameMsg: '',
                        surname: '',
                        wrongSurnameMsg: '',
                        phone: '',
                        wrongPhoneMsg: '',
                        studentid: '',
                        wrongStudentIdMsg: '',
                        personalid: '',
                        wrongPersonalIdMsg: '',
                        udp: '',
                        wrongUdpMsg: ''
                    }
                });
                break;
            case "Publisher":
                this.setState({
                    base: newBase,
                    spec: {
                        name: '',
                        wrongNameMsg: '',
                        phone: '',
                        wrongPhoneMsg: '',
                        street: '',
                        wrongStreetMsg: '',
                        number: '',
                        wrongNumberMsg: '',
                        zipcode: '',
                        wrongZipcodeMsg: ''
                    }
                });
                break;
            case "Distributor":
                this.setState({
                    base: newBase,
                    spec: {
                        name: '',
                        wrongNameMsg: '',
                        phone: '',
                        wrongPhoneMsg: '',
                        street: '',
                        wrongStreetMsg: '',
                        number: '',
                        wrongNumberMsg: '',
                        zipcode: '',
                        wrongZipcodeMsg: ''
                    }
                });
                break;
            case "Secretary":
                this.setState({
                    base: newBase,
                    spec: {
                        udp: '',
                        wrongUdpMsg: ''
                    }
                });
                break;
            default: 
                this.setState({
                    base: newBase
                });
                break;
        }

    }

    //#endregion

    //#region Spec Handlers

    handleNameChange(event) {
        let newSpec = this.state.spec;
        newSpec.name = event.target.value;
        this.setState({spec: newSpec});
    }

    handleSurnameChange(event) {
        let newSpec = this.state.spec;
        newSpec.surname = event.target.value;
        this.setState({spec: newSpec});
    }

    handleStudentIdChange(event) {
        let newSpec = this.state.spec;
        newSpec.studentid = event.target.value;
        this.setState({spec: newSpec});
    }

    handlePersonalIdChange(event) {
        let newSpec = this.state.spec;
        newSpec.personalid = event.target.value;
        this.setState({spec: newSpec});
    }
    
    handlePhoneChange(event) {
        let newSpec = this.state.spec;
        newSpec.phone = event.target.value;
        this.setState({spec: newSpec});
    }

    handleStreetChange(event) {
        let newSpec = this.state.spec;
        newSpec.street = event.target.value;
        this.setState({spec: newSpec});
    }

    handleNumberChange(event) {
        let newSpec = this.state.spec;
        newSpec.number = event.target.value;
        this.setState({spec: newSpec});
    }

    handleZipCodeChange(event) {
        let newSpec = this.state.spec;
        newSpec.zipcode = event.target.value;
        this.setState({spec: newSpec});
    }

    handleCityChange(event) {
        let newSpec = this.state.spec;
        newSpec.city = event.target.value;
        this.setState({spec: newSpec});
    }

    handleDistributorCheck(event) {
        let newSpec = this.state.spec;
        newSpec.city = event.target.value;
        this.setState({spec: newSpec});
    }

    handleUniversityDepartmentChange(event) {
        let newSpec = this.state.spec;
        newSpec.udp = event.value;
        this.setState({spec: newSpec});
    }

    //#endregion

    checkBaseMistakes() {
        let wuser = '';
        let wemail = '';
        let wpass = '';
        let wrepass = '';
        let wtype = '';

        if (this.state.base.username === '') wuser = 'Υποχρεωτικό Πεδίο';
        else {
            axios.post("/api/getUsername", {
                username: this.state.base.username
            })
            .then(res => {
                // console.log(res.data);
                if (res.data.error) {
                    wuser = 'Το όνομα αυτό υπάρχει ήδη. Παρακαλώ επιλέξτε άλλο';
                    let newBase = this.state.base;
                    newBase.wrongUsernameMsg = wuser;
                    this.setState({
                        base: newBase
                    })
                }
            })
        }

        if (this.state.base.email === '') wemail = 'Υποχρεωτικό Πεδίο';
        else if (this.state.base.email) {
            if (!this.state.base.email.includes('@')) wemail = 'Λανθασμένο Email';
            if (!this.state.base.email.includes('.')) wemail = 'Λανθασμένο Email';
        }

        if (this.state.base.password === '') wpass = 'Υποχρεωτικό Πεδίο';


        if (this.state.base.repassword === '') wrepass = 'Υποχρεωτικό Πεδίο';
        else {
            if (this.state.base.password !== this.state.base.repassword) {
                wrepass = 'Ο κωδικός αυτός δεν συμπίπτει με τον κωδικό που πληκτρολογήσατε';
            }
        }

        if (this.state.base.type === '') wtype = 'Υποχρεωτικό πεδίο';

        let newBase = this.state.base;
        newBase.wrongUsernameMsg = wuser;
        newBase.wrongEmailMsg = wemail;
        newBase.wrongRepasswordMsg = wrepass;
        newBase.wrongTypeMsg = wtype;
        newBase.wrongPasswordMsg = wpass;


        this.setState({
            base: newBase
        })

        // console.log(wuser, wemail, wpass, wrepass, wtype);
        // console.log(wuser === '' || wemail === '' || wpass === '' || wrepass === '' || wtype === '');
        // console.log(wuser === '' && wemail === '' && wpass === '' && wrepass === '' && wtype === '');
        return (wuser === '' && wemail === '' && wpass === '' && wrepass === '' && wtype === '');
        
    }

    checkSpecMistakes() {
        let wname = '';
        let wsurname = '';
        let wstudentid = '';
        let wpersonalid = '';
        let wphone = '';
        let wstreet = '';
        let wnumber = '';
        let wzipcode = '';
        let wudp = '';


        if (this.state.spec.name === '') wname = 'Υποχρεωτικό Πεδίο';

        if (this.state.spec.surname === '') wsurname = 'Υποχρεωτικό Πεδίο';


        if (this.state.spec.studentid === '') wstudentid = 'Υποχρεωτικό Πεδίο';
        else if (this.state.spec.studentid) { 
            if (this.state.spec.studentid.length !== 12 ) wstudentid = 'Λανθασμένος Αριθμός Φοιτητικής Ταυτότητας';
        }

        if (this.state.spec.personalid === '') wpersonalid = 'Υποχρεωτικό Πεδίο';
        else if (this.state.spec.personalid) { 
            if (this.state.spec.personalid.length !== 8 || this.state.spec.personalid.includes(' ')) wpersonalid = 'Λανθασμένος Αριθμός Ταυτότητας';
        }

        if (this.state.spec.phone === '') wphone = 'Υποχρεωτικό Πεδίο';
        else if (this.state.spec.phone) {
            if (this.state.spec.phone.length !== 10) wphone = 'Λανθασμένο τηλέφωνο';
        }

        if (this.state.spec.street === '') wstreet = 'Υποχρεωτικό Πεδίο';

        if (this.state.spec.number === '') wnumber = 'Υποχρεωτικό Πεδίο';

        if (this.state.spec.zipcode === '') wzipcode = 'Υποχρεωτικό Πεδίο';

        if (this.state.spec.udp === '') wudp = 'Υποχρεωτικό Πεδίο';

        let newSpec = this.state.spec;
        newSpec.wrongNameMsg = wname;
        newSpec.wrongSurnameMsg = wsurname;
        newSpec.wrongStudentIdMsg = wstudentid;
        newSpec.wrongPersonalIdMsg = wpersonalid;
        newSpec.wrongPhoneMsg = wphone;
        newSpec.wrongStreetMsg = wstreet;
        newSpec.wrongNumberMsg = wnumber;
        newSpec.wrongZipcodeMsg = wzipcode;
        newSpec.wrongUdpMsg = wudp;


        this.setState({
            spec: newSpec
        })

        // console.log(wname === '' && wsurname === '' && wstudentid === '' 
        // && wpersonalid === '' && wphone === '' && wstreet === '' 
        // && wnumber === '' && wzipcode === '' && wudp === '');

        return (wname === '' && wsurname === '' && wstudentid === '' 
                && wpersonalid === '' && wphone === '' && wstreet === '' 
                && wnumber === '' && wzipcode === '' && wudp === '');
        
    }

    parseRedirect() {
        if (this.props.params.redirect === "StudentTextbookApplication") {
            return '/actionpage/Student/0';
        }
        else if (this.props.params.redirect === "PublisherTextbookPublish") {
            return '/actionpage/Publisher/0'
        }
        return '/'
    }

    handleSubmit(event) {
        
        if (this.checkBaseMistakes() && this.checkSpecMistakes()) {
            axios.post('/api/Signup', {
                base: this.state.base,
                spec: this.state.spec
            })
            .then(res => {
                if (res.data.error) {
                    alert(res.data.message);
                    console.error(res.data.trace);
                }
                else {
                    alert(`Signup successful, Welcome ${this.state.base.type} ${this.state.base.username}`);
                    const meta = Actions[`${this.state.base.type}`];
                    sessionStorage.setItem('EudoxusUser', JSON.stringify(res.data.data) );

                    browserHistory.push(this.parseRedirect());
                }
            })
            .catch(err => console.log(err));
        }

        event.preventDefault();
    }

    SpecificSignupForm(props) {
        switch(props.type) {
            case "Student":
                return (
                    <StudentSignupForm
                        hname = {this.handleNameChange}
                        hsurname = {this.handleSurnameChange}
                        hphone = {this.handlePhoneChange}
                        hstudentid = {this.handleStudentIdChange}
                        hpersonalid = {this.handlePersonalIdChange}
                        hudp = {this.handleUniversityDepartmentChange}
                        fname = {this.state.spec.wrongNameMsg}
                        fsurname = {this.state.spec.wrongSurnameMsg}
                        fphone = {this.state.spec.wrongPhoneMsg}
                        fstudentid = {this.state.spec.wrongStudentIdMsg}
                        fpersonalid = {this.state.spec.wrongPersonalIdMsg}
                        fudp = {this.state.spec.wrongUdpMsg}/>
                )
            case "Publisher":
                return (
                    <PublisherSignupForm
                        hname = {this.handleNameChange}
                        hphone = {this.handlePhoneChange}
                        hstreet = {this.handleStreetChange}
                        hnumber = {this.handleNumberChange}
                        hzipcode = {this.handleZipCodeChange}
                        hcity = {this.handleCityChange}
                        hdistcheck = {this.handleDistributorCheck}
                        fname = {this.state.spec.wrongNameMsg}
                        fphone = {this.state.spec.wrongPhoneMsg}
                        fstreet = {this.state.spec.wrongStreetMsg}
                        fnumber = {this.state.spec.wrongNumberMsg}
                        fzipcode = {this.state.spec.wrongZipcodeMsg}/>
                )
            case "Secretary":
                return(
                    <SecretarySignupForm
                        hudp = {this.handleUniversityDepartmentChange}
                        fudp = {this.state.spec.wrongUdpMsg}/>
                )
            case "Distributor":
                return(
                    <DistributorSignupForm
                        hname = {this.handleNameChange}
                        hphone = {this.handlePhoneChange}
                        hstreet = {this.handleStreetChange}
                        hnumber = {this.handleNumberChange}
                        hzipcode = {this.handleZipCodeChange}
                        hcity = {this.handleCityChange}
                        fname = {this.state.spec.wrongNameMsg}
                        fphone = {this.state.spec.wrongPhoneMsg}
                        fstreet = {this.state.spec.wrongStreetMsg}
                        fnumber = {this.state.spec.wrongNumberMsg}
                        fzipcode = {this.state.spec.wrongZipcodeMsg}/>
                )
            default:
                return (null);
        }
    }

    render() {
        if(sessionStorage.getItem('EudoxusUser'))
            browserHistory.push('/');
        return (
            <div className="Signup">
                <Header signalLoggedStatus={this.signalLoggedStatus}/>

                <h1>Εγγραφή</h1>

                <div className="SignupForms">
                    <BaseSignupForm 
                        husername = {this.handleUsernameChange}
                        hemail = {this.handleEmailChange}
                        hpassword = {this.handlePasswordChange}
                        hrepassword = {this.handleRepasswordChange}
                        htype = {this.handleTypeChange}
                        fuser = {this.state.base.wrongUsernameMsg}
                        femail = {this.state.base.wrongEmailMsg}
                        fpass = {this.state.base.wrongPasswordMsg}
                        ftype = {this.state.base.wrongTypeMsg}
                        frepass = {this.state.base.wrongRepasswordMsg}
                    />

                    <this.SpecificSignupForm type={this.state.base.type}/>
                </div>
                <div className="SignupChoices">
                    <button id="SignupButton" onClick={this.handleSubmit}>Εγγραφή</button>
                    <div>
                        Είστε ήδη χρήστης; &nbsp;
                        <LoginPopup id="LoginLink"/>
                    </div>
                </div>
            </div>
        );
    }
}

function BaseSignupForm(props) {

    const typeOptions = [
        {
            value: '',
            label: ' '
        },
        {
            value: 'Student',
            label: 'Φοιτητής'
        },
        {
            value: 'Publisher',
            label: 'Εκδότης'
        },
        {
            value: 'Distributor',
            label: 'Διανομέας'
        },
        {
            value: 'Secretary',
            label: 'Γραμματεία Τμήματος'
        }
    ]

    return (
        <div className='SignupForm'>

            <FormTextInput 
                title = {props.fuser}
                className = {props.fuser !== '' ? 'wrong' : 'right'}
                type = "text" 
                label = 'Όνομα χρήστη *'
                placeholder="π.χ. knossos83"
                onChange = {props.husername}/>

            <FormTextInput 
                title = {props.femail}
                className = {props.femail !== '' ? 'wrong' : 'right'}
                type = "text" 
                label = 'E-mail *'
                placeholder="π.χ. knossos@gmail.com"
                onChange = {props.hemail}/>

            <FormTextInput 
                title = {props.fpass}
                className = {props.fpass !== '' ? 'wrong' : 'right'}
                type = "password"
                label = 'Κωδικός *'
                onChange = {props.hpassword}/>

            <FormTextInput 
                title = {props.frepass}
                className = {props.frepass !== '' ? 'wrong' : 'right'}
                type = "password"
                label = 'Επιβεβαίωση Κωδικού *'
                onChange = {props.hrepassword}/>

            <ComboDropdown  label="Τύπος Λογαριασμού *"
                            placeholder=""
                            options={typeOptions} 
                            onChange={props.htype} 
                            defaultValue=''
                            title={props.ftype}
                            className={props.ftype !== '' ? 'wrong' : 'right'}/>
            
        </div>
    );
}


function PublisherSignupForm(props) {
    return(
        <div className="SignupForm PublisherSignupForm">
            <label>
                
                <p>Είστε και Διανομέας; *</p>
                <div className="radioInputs" onChange = {props.hdistcheck}>
                    <div>
                        <input 
                            id="Yes"
                            type = "radio"
                            value = "true"
                            name = "distcheck"
                        />
                        <label>Ναι</label>
                    </div>
                    <div>
                        <input
                            id = "No"
                            type = "radio"
                            value = "false"
                            name = "distcheck"
                            defaultChecked
                        />
                        <label>Όχι</label>
                    </div>
                </div>
            </label>

            <FormTextInput  title={props.fname}
                            className={props.fname !== '' ? 'wrong' : 'right'}
                            type='text' 
                            label='Όνομα Εκδότη / Εκδοτικού Οίκου *' 
                            placeholder='π.χ. Εκδόσεις Κνωσσός' 
                            onChange={props.hname}/>

            <FormTextInput  title={props.fphone}
                            className={props.fphone !== '' ? 'wrong' : 'right'}
                            type='number' 
                            label='Τηλέφωνο *' 
                            placeholder='π.χ. 2109999999' 
                            onChange={props.hphone}/>

            <FormTextInput  title={props.fstreet}
                            className={props.fstreet !== '' ? 'wrong' : 'right'}
                            type='text' 
                            label='Οδός *' 
                            placeholder='π.χ. Κνωσσού' 
                            onChange={props.hstreet}/>

            <FormTextInput  title={props.fnumber}
                            className={props.fnumber !== '' ? 'wrong' : 'right'}
                            type='number' 
                            label='Αριθμός *' 
                            placeholder='π.χ. 54' 
                            onChange={props.hnumber}/>

            <FormTextInput  title={props.fzipcode}
                            className={props.fzipcode !== '' ? 'wrong' : 'right'}
                            type='number' 
                            label='Ταχυδρομικός Κώδικας *' 
                            placeholder='π.χ. 10548' 
                            onChange={props.hzipcode}/>

            <FormTextInput  type='text' 
                            label='Πόλη' 
                            placeholder='π.χ. Αθήνα' 
                            onChange={props.hcity}/>

        </div>
    )
}

class StudentSignupForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            universities: [],
            selecteduni: null,
            udp: []
        };

        autoBind(this);
    }

    componentDidMount() {
        axios.post('/api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                this.setState ( {
                    universities: res.data.data.map(uni => {return {value: uni.Id, label: uni.Name}}),
                    selecteduni: null,
                    udp: []
                });
            }
        })
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event.value
        });

        axios.post('/api/getDepartments', {
            university: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                this.setState ({
                    udp: res.data.data.map(udp => {return {value: udp.Id, label: udp.Name}})
                });
            }
        })
    }

    
    render() {
        return(
            <div className="SignupForm StudentSignupForm">
                <FormTextInput 
                    title={this.props.fname}
                    className={this.props.fname !== '' ? 'wrong' : 'right'}
                    type = "text" 
                    label = 'Όνομα Φοιτητή *'
                    placeholder="π.χ. Ιωάννης"
                    onChange = {this.props.hname}/>

                <FormTextInput 
                    title={this.props.fsurname}
                    className={this.props.fsurname !== '' ? 'wrong' : 'right'}
                    type = "text" 
                    label = 'Επώνυμο Φοιτητή *'
                    placeholder="π.χ. Παπαδόπουλος"
                    onChange = {this.props.hsurname}/>
                    
                <FormTextInput 
                    title={this.props.fphone}
                    className={this.props.fphone !== '' ? 'wrong' : 'right'}
                    type = "number" 
                    label = 'Τηλέφωνο *'
                    placeholder="π.χ. 6949999999"
                    onChange = {this.props.hphone}/>

                <FormTextInput 
                    title={this.props.fstudentid}
                    className={this.props.fstudentid !== '' ? 'wrong' : 'right'}
                    type = "number" 
                    label = 'Αριθμός Φοιτητικής Ταυτότητας *'
                    placeholder="π.χ. 123456789012"
                    onChange = {this.props.hstudentid}/>

                <FormTextInput 
                    title={this.props.fpersonalid}
                    className={this.props.fpersonalid !== '' ? 'wrong' : 'right'}
                    type = "text" 
                    label = 'Αριθμός Προσωπικής Ταυτότητας (Χωρίς κενά) *'
                    placeholder="π.χ. ΑΒ123456"
                    onChange = {this.props.hpersonalid}/>

                <ComboDropdown  label="Πανεπιστήμιο *"
                                placeholder=""
                                options={this.state.universities} 
                                onChange={this.getDepartments} 
                                defaultValue=''/>

                <ComboDropdown  label="Τμήμα *"
                                placeholder=""
                                options={this.state.udp} 
                                onChange={this.props.hudp} 
                                title={this.props.fudp}
                                className={this.props.fudp !== '' ? 'wrong' : 'right'}
                                defaultValue=''/>

            </div>
        );
    }
}

class SecretarySignupForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            universities: [],
            selecteduni: null,
            udp: []
        };

        autoBind(this);
    }

    componentDidMount() {
        axios.post('/api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                this.setState ( {
                    universities: res.data.data.map(uni => {return {value: uni.Id, label: uni.Name}}),
                    selecteduni: null,
                    udp: []
                });
            }
        })
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event.value
        });

        axios.post('/api/getDepartments', {
            university: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                this.setState ({
                    udp: res.data.data.map(udp => {return {value: udp.Id, label: udp.Name}})
                });
            }
        })
    }

    
    render() {
        return(
            <div className="SignupForm SecretarySignupForm">

            <ComboDropdown  label="Πανεπιστήμιο *"
                            placeholder=""
                            options={this.state.universities} 
                            onChange={this.getDepartments} 
                            defaultValue=''/>

            <ComboDropdown  label="Τμήμα *"
                            placeholder=""
                            options={this.state.udp} 
                            onChange={this.props.hudp} 
                            title={this.props.fudp}
                            className={this.props.fudp !== '' ? 'wrong' : 'right'}
                            defaultValue=''/>
            </div>
        );
    }
}

function DistributorSignupForm(props) {

    return(
        <div className="SignupForm DistributorSignupForm">

            <FormTextInput  title={props.fname}
                            className={props.fname !== '' ? 'wrong' : 'right'}
                            type='text' 
                            label='Όνομα Σημείου Διανομής *' 
                            placeholder='π.χ. Βιβλιοπωλείο "Ο Λάμπρος"' 
                            onChange={props.hname}/>

            <FormTextInput  title={props.fphone}
                            className={props.fphone !== '' ? 'wrong' : 'right'}
                            type='number' 
                            label='Τηλέφωνο *' 
                            placeholder='π.χ. 2109999999' 
                            onChange={props.hphone}/>

            <FormTextInput  title={props.fstreet}
                            className={props.fstreet !== '' ? 'wrong' : 'right'}
                            type='text' 
                            label='Οδός *' 
                            placeholder='π.χ. Κνωσσού' 
                            onChange={props.hstreet}/>

            <FormTextInput  title={props.fnumber}
                            className={props.fnumber !== '' ? 'wrong' : 'right'}
                            type='number' 
                            label='Αριθμός *' 
                            placeholder='π.χ. 54' 
                            onChange={props.hnumber}/>

            <FormTextInput  title={props.fzipcode}
                            className={props.fzipcode !== '' ? 'wrong' : 'right'}
                            type='number' 
                            label='Ταχυδρομικός Κώδικας *' 
                            placeholder='π.χ. 10548' 
                            onChange={props.hzipcode}/>

            <FormTextInput  type='text' 
                            label='Πόλη' 
                            placeholder='π.χ. Αθήνα' 
                            onChange={props.hcity}/>

        </div>
    );
}