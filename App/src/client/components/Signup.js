import React, { Component } from 'react';
import {LoginPopup} from './Login';
import Header from './Header';
import '../css/Signup.css';
import axios from 'axios';
import autoBind from 'react-autobind';
import { Link } from 'react-router';

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

    //#region Base Checks-Handlers

    checkFalseUsername() {
        return this.state.base.wrongUsernameMsg;
    }

    checkFalsePassword() {
        return this.state.base.wrongPasswordMsg;
    }

    checkFalseType() {
        return this.state.base.wrongTypeMsg;
    }

    checkFalseRepassword() {
        return this.state.base.wrongRepasswordMsg;
    }

    checkFalseEmail() {
        return this.state.base.wrongEmailMsg;
    }


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
        newBase.type = event.target.value;
        this.setState({base: newBase});
    }

    checkBaseMistakes() {
        let wuser = '';
        let wemail = '';
        let wpass = '';
        let wrepass = '';
        let wtype = '';

        if (this.state.base.username === '') wuser = 'Υποχρεωτικό Πεδίο';

        if (this.state.base.email === '') wemail = 'Υποχρεωτικό Πεδίο';

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

        return (wuser === '' && wemail === '' && wpass === '' && wrepass === '' && wtype === '');
        
    }
    //#endregion

    //#region Spec Checks-Handlers

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
        newSpec.udp = event.target.value;
        this.setState({spec: newSpec});
    }

    //#endregion

    handleSubmit(event) {
        console.log(this.state);

        if (this.checkBaseMistakes()) {
            axios.post('api/Signup', {
                username: this.state.base.username,
                password: this.state.base.password,
                repassword: this.state.base.repassword,
                email: this.state.base.email
            })
            .then(res => {
                if (res.data.error) {
                    this.setState({
                        base: {
                            username: this.state.username, 
                            password: '',
                            repassword: '',
                            wrongUsernameMsg: 'Το όνομα που επιλέξατε υπάρχει ήδη. Παρακαλώ επιλέξτε άλλο.',
                            wrongRepasswordMsg: true
                        }
                    })
                }
                else {
                    alert("Login successful, Welcome " + res.data.data.Type);
                    props.handler(res.data.data.Username);
                    this.setState({
                        base: {
                            username: this.state.username, 
                            password: '',
                            repassword: '',
                            wrongUsername: false,
                            wrongRepassword: false
                        }
                    })
                }
            })
            .catch(err => console.log(err));
        }

        event.preventDefault();
    }

    SpecificSignupForm(props) {
        switch(props.type) {
            case "Stud":
                return (
                    <StudentSignupForm
                        hname = {this.handleNameChange}
                        hsurname = {this.handleSurnameChange}
                        hphone = {this.handlePhoneChange}
                        hstudentid = {this.handleStudentIdChange}
                        hpersonalid = {this.handlePersonalIdChange}
                        hudp = {this.handleUniversityDepartmentChange}/>
                )
            case "Publ":
                return (
                    <PublisherSignupForm
                        hname = {this.handleNameChange}
                        hphone = {this.handlePhoneChange}
                        hstreet = {this.handleStreetChange}
                        hnumber = {this.handleNumberChange}
                        hzipcode = {this.handleZipCodeChange}
                        hcity = {this.handleCityChange}
                        hdistcheck = {this.handleDistributorCheck}/>
                )
            case "Secr":
                return(
                    <SecretarySignupForm
                        hudp = {this.handleUniversityDepartmentChange}/>
                )
            case "Dist":
                return(
                    <DistributorSignupForm
                        hname = {this.handleNameChange}
                        hphone = {this.handlePhoneChange}
                        hstreet = {this.handleStreetChange}
                        hnumber = {this.handleNumberChange}
                        hzipcode = {this.handleZipCodeChange}
                        hcity = {this.handleCityChange}/>
                )
            default:
                return (null);
        }
    }

    render() {
        return (
            <div className="Signup">
                <Header/>

                <h1>Εγγραφή</h1>

                <div className="SignupForms">
                    <BaseSignupForm 
                        husername = {this.handleUsernameChange}
                        hemail = {this.handleEmailChange}
                        hpassword = {this.handlePasswordChange}
                        hrepassword = {this.handleRepasswordChange}
                        htype = {this.handleTypeChange}
                        fuser = {this.checkFalseUsername}
                        femail = {this.checkFalseEmail}
                        fpass = {this.checkFalsePassword}
                        ftype = {this.checkFalseType}
                        frepass = {this.checkFalseRepassword}
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

function FormTextInput(props)  {
    return(
        <label>
            <p>{props.label}</p>
            <input 
                title = {props.title}
                className = {props.className}
                type = {props.type} 
                placeholder={props.placeholder}
                onChange = {props.onChange}
            />
        </label>
    );
}


function BaseSignupForm(props) {

    return (
        <div className='SignupForm'>

                <FormTextInput 
                    title = {props.fuser()}
                    className = {props.fuser() !== '' ? 'wrong' : 'right'}
                    type = "text" 
                    label = 'Όνομα χρήστη *'
                    placeholder="π.χ. knossos83"
                    onChange = {props.husername}/>

                <FormTextInput 
                    title = {props.femail()}
                    className = {props.femail() !== '' ? 'wrong' : 'right'}
                    type = "text" 
                    label = 'E-mail *'
                    placeholder="π.χ. knossos@gmail.com"
                    onChange = {props.hemail}/>

                <FormTextInput 
                    title = {props.fpass()}
                    className = {props.fpass() !== '' ? 'wrong' : 'right'}
                    type = "password"
                    label = 'Κωδικός *'
                    onChange = {props.hpassword}/>

                <FormTextInput 
                    title = {props.frepass()}
                    className = {props.frepass() !== '' ? 'wrong' : 'right'}
                    type = "password"
                    label = 'Επιβεβαίωση Κωδικού *'
                    onChange = {props.hrepassword}/>

            <label>
                <p>Τύπος Λογαριασμού*</p>
                <select 
                    title = {props.ftype()}
                    className = {props.ftype() !== '' ? 'wrong' : 'right'}
                    type = "dropdown"
                    onChange = {props.htype} >
                        <option value = ''></option>
                        <option value = "Stud">Φοιτητής</option>
                        <option value = "Publ">Εκδότης</option>
                        <option value = "Dist">Διανομέας</option>
                        <option value = "Secr">Γραμματεία Τμήματος</option>
                </select>
            </label>
            
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

            <FormTextInput  type='text' 
                            label='Όνομα Εκδότη / Εκδοτικού Οίκου *' 
                            placeholder='π.χ. Εκδόσεις Κνωσσός' 
                            onChange={props.hname}/>

            <FormTextInput  type='number' 
                            label='Τηλέφωνο *' 
                            placeholder='π.χ. 2109999999' 
                            onChange={props.hphone}/>

            <FormTextInput  type='text' 
                            label='Οδός *' 
                            placeholder='π.χ. Κνωσσού' 
                            onChange={props.hstreet}/>

            <FormTextInput  type='number' 
                            label='Αριθμός *' 
                            placeholder='π.χ. 54' 
                            onChange={props.hnumber}/>

            <FormTextInput  type='number' 
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

        axios.post('api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                console.log(res.data);
                this.setState ( {
                    universities: res.data.data,
                    selecteduni: null,
                    udp: []
                });
            }
        })

        autoBind(this);
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event.target.value
        });

        axios.post('api/getDepartments', {
            university: event.target.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                console.log(res.data);
                this.setState ({
                    udp: res.data.data
                });
            }
        })
    }

    
    render() {
        return(
            <div className="SignupForm StudentSignupForm">
                <FormTextInput 
                    type = "text" 
                    label = 'Όνομα Φοιτητή *'
                    placeholder="π.χ. Ιωάννης"
                    onChange = {this.props.hname}/>

                <FormTextInput 
                    type = "text" 
                    label = 'Επώνυμο Φοιτητή *'
                    placeholder="π.χ. Παπαδόπουλος"
                    onChange = {this.props.hsurname}/>
                    
                <FormTextInput 
                    type = "number" 
                    label = 'Τηλέφωνο *'
                    placeholder="π.χ. 6949999999"
                    onChange = {this.props.hphone}/>

                <FormTextInput 
                    type = "number" 
                    label = 'Αριθμός Φοιτητικής Ταυτότητας *'
                    placeholder="π.χ. 123456789012"
                    onChange = {this.props.hstudentid}/>

                <FormTextInput 
                    type = "text" 
                    label = 'Αριθμός Προσωπικής Ταυτότητας *'
                    placeholder="π.χ. ΑΒ 111111"
                    onChange = {this.props.hpersonalid}/>

                <label>
                    <p>Πανεπιστήμιο *</p>
                    <select 
                        type = "dropdown"
                        onChange = {this.getDepartments}
                        >
                        <option value = ''></option>
                        {
                            this.state.universities.map(uni => {
                                return (
                                    <option key = {uni.Id} value = {uni.Id}>{uni.Name}</option>
                                );
                            })
                        }
                    </select>
                </label>

                <label>
                    <p>Τμήμα *</p>
                    <select 
                        type = "dropdown"
                        onChange = {this.props.hudp}
                        >
                        <option value = ''></option>
                        {
                            this.state.udp.map(dep => {
                                return (
                                    <option key = {dep.Id} value = {dep.Id}>{dep.Name}</option>
                                );
                            })
                        }
                    </select>
                </label>

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

        axios.post('api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                console.log(res.data);
                this.setState ( {
                    universities: res.data.data,
                    selecteduni: null,
                    udp: []
                });
            }
        })

        autoBind(this);
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event.target.value
        });

        axios.post('api/getDepartments', {
            university: event.target.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                console.log(res.data);
                this.setState ({
                    udp: res.data.data
                });
            }
        })
    }

    
    render() {
        return(
            <div className="SignupForm SecretarySignupForm">

                <label>
                    <p>Πανεπιστήμιο *</p>
                    <select 
                        type = "dropdown"
                        onChange = {this.getDepartments}
                        >
                        <option value = ''></option>
                        {
                            this.state.universities.map(uni => {
                                return (
                                    <option key = {uni.Id} value = {uni.Id}>{uni.Name}</option>
                                );
                            })
                        }
                    </select>
                </label>

                <label>
                    <p>Τμήμα *</p>
                    <select 
                        type = "dropdown"
                        onChange = {this.props.hudp}
                        >
                        <option value = ''></option>
                        {
                            this.state.udp.map(dep => {
                                return (
                                    <option key = {dep.Id} value = {dep.Id}>{dep.Name}</option>
                                );
                            })
                        }
                    </select>
                </label>

            </div>
        );
    }
}

function DistributorSignupForm(props) {

    return(
        <div className="SignupForm DistributorSignupForm">

            <FormTextInput  type='text' 
                            label='Όνομα Σημείου Διανομής *' 
                            placeholder='π.χ. Βιβλιοπωλείο "Ο Λάμπρος"' 
                            onChange={props.hname}/>

            <FormTextInput  type='number' 
                            label='Τηλέφωνο *' 
                            placeholder='π.χ. 2109999999' 
                            onChange={props.hphone}/>

            <FormTextInput  type='text' 
                            label='Οδός *' 
                            placeholder='π.χ. Κνωσσού' 
                            onChange={props.hstreet}/>

            <FormTextInput  type='number' 
                            label='Αριθμός *' 
                            placeholder='π.χ. 54' 
                            onChange={props.hnumber}/>

            <FormTextInput  type='number' 
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