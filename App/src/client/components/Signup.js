import React, { Component } from 'react';
import {LoginPopup} from './Login';
import Header from './Header';
import '../css/Signup.css';
import axios from 'axios';
import { Link } from 'react-router';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            base: {
                username: '', 
                password: '', 
                repassword: '',
                type: '',

                wrongUsernameMsg: '',
                wrongRepasswordMsg: '',
                wrongPasswordMsg: '',
                wrongTypeMsg: ''
            },
            spec: {}
        };
            
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepasswordChange = this.handleRepasswordChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);

        this.checkFalsePassword = this.checkFalsePassword.bind(this);
        this.checkFalseUsername = this.checkFalseUsername.bind(this);
        this.checkFalseRepassword = this.checkFalseRepassword.bind(this);
        this.checkFalseType = this.checkFalseType.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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


    handleUsernameChange(event) {
        let newBase = this.state.base;
        newBase.username = event.target.value;
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
        let wpass = '';
        let wrepass = '';
        let wtype = '';

        if (this.state.base.username === '') wuser = 'Υποχρεωτικό Πεδίο';

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
        newBase.wrongRepasswordMsg = wrepass;
        newBase.wrongTypeMsg = wtype;
        newBase.wrongPasswordMsg = wpass;


        this.setState({
            base: newBase
        })

        console.log(wuser, wpass, wrepass, wtype);
        console.log(wuser === '' || wpass === '' || wrepass === '' || wtype === '');

        return (wuser === '' && wpass === '' && wrepass === '' && wtype === '');
        
    }

    handleSubmit(event) {
        console.log(this.state);
        if (this.checkBaseMistakes()) {
            axios.post('api/Signup', {
                username: this.state.username,
                password: this.state.password,
                repassword: this.state.repassword
            })
            .then(res => {
                if (res.data.error) {
                    this.setState({
                        base: {
                            username: this.state.username, 
                            password: '',
                            repassword: '',
                            wrongUsername: true,
                            wrongRepassword: true
                        }
                    })
                }
                else {
                    alert("Login successful, Welcome " + res.data.data.Type);
                    this.props.handler(res.data.data.Username);
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

    render() {
        return (
            <div>
                <Header/>
                <BaseSignupForm 
                    husername = {this.handleUsernameChange}
                    hpassword = {this.handlePasswordChange}
                    hrepassword = {this.handleRepasswordChange}
                    htype = {this.handleTypeChange}
                    fuser = {this.checkFalseUsername}
                    fpass = {this.checkFalsePassword}
                    ftype = {this.checkFalseType}
                    frepass = {this.checkFalseRepassword}
                />

                <button id="SignupButton" onClick={this.handleSubmit}>Εγγραφή</button>
                <br/>
                <span>
                    Είστε ήδη χρήστης; &nbsp;
                    <LoginPopup/>
                </span>
            </div>
        );
    }
}

class BaseSignupForm extends Component {
  
    render() {

        return (
            <div className='SignupForm'>

                <header>Εγγραφή</header>
                <label>
                    <p>Όνομα χρήστη *</p>
                    <input 
                        title = {this.props.fuser()}
                        className = {this.props.fuser() !== '' ? 'wrong' : 'right'}
                        type = "text" placeholder="Όνομα Χρήστη"
                        onChange = {this.props.husername}
                    />
                </label>

                <label>
                    <p>Κωδικός *</p>
                    <input 
                        title = {this.props.fpass()}
                        className = {this.props.fpass() !== '' ? 'wrong' : 'right'}
                        type = "password"
                        placeholder="********"
                        onChange = {this.props.hpassword}
                    />
                </label>

                <label>
                    <p>Επιβεβαίωση Κωδικού *</p>
                    <input 
                        title = {this.props.frepass()}
                        className = {this.props.frepass() !== '' ? 'wrong' : 'right'}
                        type = "password"
                        placeholder="********"
                        onChange = {this.props.hrepassword}
                    />
                </label>

                <label>
                    <p>Τύπος Λογαριασμού*</p>
                    <select 
                        title = {this.props.ftype()}
                        className = {this.props.ftype() !== '' ? 'wrong' : 'right'}
                        type = "dropdown"
                        onChange = {this.props.htype}
                    >
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
}

// class StudentSignupForm extends Component {
//     render() {
//         return(

//         )
//     }
// }