import React, {Component} from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';

import "../../css/Student/ApplicationManager.css"
import searchimg from "../../images/search.png"


export default class ApplicationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textbooks: [],
            basket: []
        }
        autoBind(this);
    }

    Search(filters) {
        filters = {
            university: filters.selecteduni,
            udp: filters.selectedudp,
            course: filters.selectedcourse,
            semester: filters.selectedsemester
        }
        console.log(filters);
        let path = '/api/getTextbooks'
        if (filters.course) {
            path += '/Course'
        }

        axios.post(path, filters)
        .then(res => {
            if (res.data.error) {
                alert(res.data.message)
            }
            else {
                console.log(res.data);
                this.setState ({
                    textbooks: res.data.data
                });
            }
        })
    }

    render() {


        return (
            <div className="ApplicationManager">
                <h1>Δήλωση Συγγραμμάτων</h1>
                <div className="line"/>
                <Filters submit={this.Search}/>
                <TextbookContainer textbooks={this.state.textbooks}/>
            </div>
        )
    }
}

class Filters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            universities: [],
            selecteduni: null,

            udp: [],
            selectedudp: null,

            courses: [],
            selectedcourse: null,

            semesters: [],
            selectedsemester: null
        };

        axios.post('/api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                // console.log(res.data);
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

        if (event.target.value === '') {
            this.setState({
                selecteduni: null,

                udp: [],
                selectedudp: null,

                courses: [],
                selectedcourse: null,

                semesters: [],
                selectedsemester: null
            })
            return;
        };

        axios.post('/api/getDepartments', {
            university: event.target.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                // console.log(res.data);
                this.setState ({
                    udp: res.data.data
                });
            }
        })
    }

    getSemesters(event) {
        this.setState({
            selectedudp: event.target.value
        });

        if (event.target.value === '') {
            this.setState({
                selectedudp: null,

                courses: [],
                selectedcourse: null,

                semesters: [],
                selectedsemester: null
            })
            return;
        };

        axios.post('/api/getSemesters', {
            udp: event.target.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message);
            }
            else {
                // console.log("Semesters" , res.data);
                this.setState({
                    semesters: res.data.data
                })
            }
        })
    }

    getCourses(event) {
        this.setState({
            selectedudp: event.target.value
        });

        if (event.target.value === '') {
            this.setState({
                selectedudp: null,

                courses: [],
                selectedcourse: null,

                semesters: [],
                selectedsemester: null
            })
            return;
        };

        axios.post('/api/getCourses', {
            udp: event.target.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message);
            }
            else {
                // console.log(res.data);
                this.setState({
                    courses: res.data.data
                })
            }
        })
    }

    getCoursesBySemester(event) {
        this.setState({
            selectedsemester: event.target.value
        });

        if (event.target.value === '') {
            this.setState({
                selectedsemester: null
            })
            return this.getCourses({target: {value: this.state.selectedudp}});
        }

        axios.post('/api/getCourses/Semesters', {
            udp: this.state.selectedudp,
            semester: event.target.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message);
            }
            else {
                // console.log(res.data);
                this.setState({
                    courses: res.data.data
                })
            }
        })

    }

    handleCourse(event) {
        this.setState({
            selectedcourse: event.target.value
        })
    }

    Dropdown(props) {
        return (
            <label className="SearchBar">
                <p>{props.label}</p>
                <select 
                    type = "dropdown"
                    onChange = {props.onChange}
                    >
                    <option value = ''></option>
                    {
                        props.data.map(element => {
                            return (
                                <option key = {element.Id} value = {element.Id}>{element.Name}</option>
                            );
                        })
                    }
                </select>
            </label>
        )
    }

    handleSubmit() {
       
        if (!this.state.selectedudp) {
            return;
        }

        this.props.submit(this.state);
    }


    render() {
        return (
            <div className="Filters">
                <this.Dropdown label="Πανεπιστήμιο" onChange={this.getDepartments} data={this.state.universities}/>
                <this.Dropdown label="Τμήμα" onChange={(event) => {this.getCourses(event); this.getSemesters(event); }} data={this.state.udp}/>
                <this.Dropdown label="Εξάμηνο" onChange={this.getCoursesBySemester} data={this.state.semesters}/>
                <this.Dropdown label="Μάθημα" onChange={this.handleCourse} data={this.state.courses}/>

                <button onClick={this.handleSubmit} className="SearchButton">
                    <img src={searchimg} className="SearchImg"/>
                </button>
            </div>
        )
    }
}

function TextbookContainer(props) {
    const textbooks = props.textbooks.map(tb => {
        return <Textbook data={tb}/>
    })

    return (
        <div className = "TextbookContainer">
            {textbooks}
        </div>
    )
}

function Textbook(props) {
    
    return (
        <div className="Textbook">
            <h3>{props.data.Name}</h3>
        </div>
    );
}