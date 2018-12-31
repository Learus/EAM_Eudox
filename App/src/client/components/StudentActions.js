import React, {Component} from 'react';
import '../css/StudentActions.css';
import axios from 'axios';

export {
    StudentApplications
};


function StudentApplications(props) {
    return(
        <div>
            <h1>Οι Δηλώσεις Μου</h1>
            <div className = "line"/>
            <div className = "grid">
                <StudentApplicationList username={props.username}/>
            </div>
        </div>
    );
}

class StudentApplicationList extends Component {

    constructor(props) {
        super(props);
        console.log(props.username);
        
        this.state = {list: null};

        if(props.username)
        {
            axios.post('api/getStudentApplications', {
                username: props.username
            }).then( res => {
                if (res.data.error) {
                    console.error(res.data.message);
                }
                else {
                    this.setState({
                        list: res.data.data
                    })
                }
            });
        }
    }

    render() {
        return(
            <div className="StudentApplicationList">
                <h2>Τρέχουσα Δήλωση</h2>
                {this.state.list != null ? this.state.list : ''}
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