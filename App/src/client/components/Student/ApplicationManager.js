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
            basket: [],
            textbooksBySemester: []
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
                // console.log('parsed', this.parseTextbooks(res.data.data));
                this.setState ({
                    textbooks: res.data.data,
                    textbooksBySemester: this.parseTextbooks(res.data.data)
                });
            }
        })
    }

    Add(textbook) {
        let newBasket = this.state.basket;
        let replaced = false;
        for (let i = 0; i < newBasket.length; i++) {
            if (textbook.c.Id === newBasket[i].c.Id) {
                newBasket[i] = textbook;
                replaced = true;
                break;
            }
        }

        if (!replaced) {
            newBasket = newBasket.concat([textbook]);
        }

        this.setState({
            basket: newBasket
        })

    }

    Remove(textbook) {
        let newBasket = [];
        for (let i = 0; i < this.state.basket.length; i++) {
            if (textbook.c.Id === this.state.basket[i].c.Id) {
                continue;
            }
            newBasket.push(this.state.basket[i]);
        }

        this.setState({
            basket: newBasket
        })
    }

    parseTextbooks(Textbooks) {
        let Semesters = {};

        for (let i = 0; i < Textbooks.length; i++) {
            console.log(Textbooks[i]);
            const semesterKey = `${Textbooks[i].c.Semester}`;
            const courseKey = `${Textbooks[i].c.Id}`;

            if (!Semesters.hasOwnProperty(Textbooks[i].c.Semester)) {
                Semesters[semesterKey] = {};
            }

            if (!Semesters[semesterKey].hasOwnProperty(Textbooks[i].c.Id)) {
                Semesters[semesterKey][courseKey] = {
                    courses: [],
                    name: Textbooks[i].c.Id
                };
            }

            Semesters[semesterKey][courseKey].courses.push(Textbook[i]);
        }
        
        const SemesterKeys = Object.keys(Semesters);
        let retVal = [];

        for (let i = 0; i < SemesterKeys.length; i++) {
            let key = SemesterKeys[i];
            retVal.push(Semesters[key]);
        }
        
        return retVal;
    }

    isChosen(textbook) {
        if (this.state.basket.includes(textbook)) {
            return true;
        }
        return false;
    }

    render() {


        return (
            <div className="ApplicationManager">
                <h1>Δήλωση Συγγραμμάτων</h1>
                <div className="line"/>
                <Filters submit={this.Search}/>
                <TextbookContainer 
                    textbooks={this.state.textbooksBySemester} 
                    adder={this.Add}
                    remover={this.Remove}
                    isChosen={this.isChosen}/>
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
    let last_id = -1;
    let last_semester = -1;
    const textbooks = props.textbooks.map(tb => {
        // if id has changed display header
        const course = last_id !== tb.c.Id ? <h3 className="CourseHeader">{tb.c.Name}</h3> : null;
        last_id = tb.c.Id;

        const semester = last_semester !== tb.c.Semester ? <h2 className="SemesterHeader">{tb.c.Semester}ο Εξάμηνο</h2> : null;
        last_semester = tb.c.Semester;

        return (
            <div key={`${tb.c.Id}${tb.t.Id}`}>
                {semester}
                {course}
                <Textbook 
                    data={tb} 
                    adder={props.adder}
                    remover={props.remover}
                    isChosen={props.isChosen}
                    key={`${tb.c.Id}${tb.t.Id}`}/>
            </div>
        )
    })

    return (
        <div className = "TextbookContainer">
            {textbooks}
        </div>
    )
}

function Textbook(props) {  
    let className = "Textbook";
    let chosen = false;
    if (props.isChosen(props.data)) {
        className += " Chosen";
        chosen = true;
    }
    return (
        <div className={className}>
            <h3>{props.data.t.Name}</h3>
            <p>{props.data.t.Writer}</p>
            <p>{props.data.t.Date_Published}</p>
            <p>{"ISBN: " + props.data.t.ISBN}</p>
            <p>{props.data.p.Name}</p>
            {chosen ? 
            <button className="RemoveButton" onClick={() => { props.remover(props.data)}}>
                Διαγραφή
            </button>
            :
            <button className="AddButton" onClick={() => { props.adder(props.data)}}>
                Επιλογή
            </button>}
        </div>
    );
}