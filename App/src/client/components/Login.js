import React, {Component} from 'react';
import Popup from "reactjs-popup";
import {Link, browserHistory} from 'react-router';
import axios from "axios"
import '../css/Login.css'
import Actions from './Actions';

export class LoginPopup extends React.Component {
    render() {
        return (
            <Popup className='LoginPopup' trigger={<Link className="Link">Σύνδεση</Link>} modal>
                { close => (
                    this.props.hasOwnProperty('loginHandler') ?
                    <LoginForm loginHandler={this.props.loginHandler} Close={close}/>
                    :
                    <LoginForm Close={close}/>
                )}
            </Popup>
        );
    }
}

export class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', wrong: false};
            
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleUsernameChange(event) {
        this.setState({ username : event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
  
    handleSubmit(event) {
        axios.post('/api/Login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            if (res.data.error) {
                this.setState({
                    username: this.state.username,
                    password: this.state.password,
                    wrong: true
                })
            }
            else {
                alert("Login successful, Welcome " + res.data.data.Type);
                const meta = Actions[`${res.data.data.Type}`];
                this.props.Close();
                sessionStorage.setItem('EudoxusUser', JSON.stringify(res.data.data) );

                if (this.props.hasOwnProperty('loginHandler')) {
                    console.log(this.props);
                    this.props.loginHandler();
                }
                // browserHistory.push(`/actionpage/${res.data.data.Username}/${meta.Type}/${meta.Default}`);
            }
        })
        .catch(err => console.log(err));


        event.preventDefault();
    }
  
    render() {
        return (
            <form className='LoginForm' onSubmit={this.handleSubmit}>

                <header>Σύνδεση</header>
                <label>
                    <p>Όνομα χρήστη</p>
                    <input 
                        title={this.state.wrong ? 'Wrong Username' : ''}
                        className={this.state.wrong ? 'wrong' : 'right'}
                        type="text" placeholder="π.χ. knossos83"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                </label>

                <label>
                    <p>Κωδικός</p>
                    <input 
                        title={this.state.wrong ? 'Wrong Password' : ''}
                        className={this.state.wrong ? 'wrong' : 'right'}
                        type="password" placeholder="********"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </label>

                <button id="LoginButton" type="submit">Σύνδεση</button>

                <span>
                    Νέος χρήστης; &nbsp;
                    <Link to="/signup" className="Link">Γίνε μέλος.</Link>
                </span>
                
            </form>
        );
    }
}