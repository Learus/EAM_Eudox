import React, {Component} from 'react';
import Popup from "reactjs-popup";
import {Link, browserHistory} from 'react-router';
import axios from "axios"
import '../css/Login.css'
import Actions from './Actions';
import autobind from 'react-autobind';

export default function LoginPopup(props) {
    let className = (props.className ? props.className : "Link");
    let content = (props.content ? props.content : "Σύνδεση")
    if (props.disabled)
        return <button className={className} disabled>{content}</button>
    else
        return (
        <Popup className='LoginPopup' trigger={<button className={className}>{content}</button>} modal>
                { close => (
                    props.hasOwnProperty('loginHandler') ?
                    <LoginForm saveData={props.saveData} signupRedirect={props.signupRedirect} loginHandler={props.loginHandler} Close={close}/>
                    :
                    <LoginForm signupRedirect={props.signupRedirect} Close={close}/>
                )}
            </Popup>
        )
}

export class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', wrong: false};
        autobind(this);
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
                this.props.Close();
                sessionStorage.setItem('EudoxusUser', JSON.stringify(res.data.data) );

                if (this.props.hasOwnProperty('loginHandler')) {
                    this.props.loginHandler();
                }
            }
        })
        .catch(err => console.log(err));


        event.preventDefault();
    }
  
    render() {
        const signupPath = this.props.signupRedirect ? `/signup/${this.props.signupRedirect}` : '/signup'
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
                    <Link to={signupPath} onClick={this.props.saveData} className="Link">Γίνε μέλος.</Link>
                </span>
                
            </form>
        );
    }
}