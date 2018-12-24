import React, {Component} from 'react';
import Popup from "reactjs-popup";
import axios from "axios"
import '../css/Login.css'

export class LoginPopup extends React.Component {
    closePopup() {
        close();
    }

    render() {
        return (
            <Popup className='LoginPopup' trigger={<button>Trigger</button>}>
                <LoginForm/>
            </Popup>
        );
    }
}

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
            
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
        axios.post('api/Login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                if (res.data.error) {
                    alert(res.data.message);
                }
                else {
                    alert("Login successful, Welcome " + res.data.data.Type);
                    this.props.handler(res.data.data.Username);
                    this.setState({
                        username: '',
                        password: ''
                    })
                }
            })
            .catch(err => console.log(err));


        event.preventDefault();
    }
  
    render() {
        // let password = this.state.password.map
        return (
            <form className='LoginForm' onSubmit={this.handleSubmit}>
                <header>Σύνδεση</header>
                <label>
                    <p>Όνομα χρήστη</p>
                    <input type="text" placeholder="Όνομα Χρήστη" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>

                <label>
                    <p>Κωδικός</p>
                    <input type="password" placeholder="********" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>

                <button id="LoginButton" type="submit">Σύνδεση</button>

                <p>Νέος χρήστης; </p>
                
                

            </form>
        );
    }
}