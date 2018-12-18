import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";
import axios from "axios"

// let username = '';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = { username: null };
    }
    
    handler(value) {
        this.setState({
            username: value
        })
    }


    componentDidMount() {
        // axios.get('api/getUsername')
        //     .then(res => this.setState({ username: res.data.username }))
        //     .catch(err => console.log(err));
    }

    login() {

    }

    render() {
        const { username } = this.state;
        return (
            <div>
                {username ? (<h1>{`Welcome ${username}`}</h1>) : (<h1>Greetings guest1092831098</h1>)}
                <LoginForm handler = {this.handler} />
            </div>
        );
    }
}

class LoginForm extends React.Component {
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
            <form onSubmit={this.handleSubmit}>

                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>

                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                <input type="submit" value="Login" />

            </form>
        );
    }
}
