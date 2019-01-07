import React, {Component} from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import {browserHistory} from 'react-router';
import LoginPopup from '../Login';
import {LoginForm} from '../Login';

import "../../css/Student/ApplicationManager.css"
import searchimg from "../../images/search.png"
import deleteimg from "../../images/trash.png"


export default class ApplicationManager extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            textbooks: [],
            basket: [],
            textbooksBySemester: [],
            searchType: null,
            user: null
        }
    }

    componentDidMount() {
        if (this.props.id) {
            const user = this.getUser();
            console.log("HI")
            axios.post("/api/getTextbookApplication", {id: this.props.id, username: user ? user.Username : null})
            .then(res => {
                if (res.data.error) {
                    browserHistory.push(`/actionpage/Student/0`);
                }
                else {
                    this.setState({
                        basket: res.data.data,
                        user: user
                    })
                }
            })
            .catch(err => console.error(err));
        }
        else {
            let application = sessionStorage.getItem("PendingTextbookApplication");
            if (application) {
                application = JSON.parse(application);
                this.setState({
                    basket: application
                })
            }
        }
    }

    shouldComponentUpdate() {
        if (this.props.id && !this.getUser()) {
            this.setState({
                basket: []
            })
            browserHistory.push(`/actionpage/Student/0`);
        }
        return true;
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem('EudoxusUser'));
    }

    loginHandler() {

    }

    Search(filters) {
        filters = {
            university: filters.selecteduni,
            udp: filters.selectedudp,
            course: filters.selectedcourse,
            semester: filters.selectedsemester
        }

        let searchType = null;
        if (filters.semester && !filters.course) {
            searchType = "Semester"
        }

        let path = '/api/getTextbooks'
        if (filters.course) {
            path += '/Course';
            searchType = "Course"
        }

        axios.post(path, filters)
        .then(res => {
            if (res.data.error) {
                alert(res.data.message)
            }
            else {
                this.setState ({
                    searchType: searchType,
                    textbooks: res.data.data,
                    textbooksBySemester: this.parseTextbooks(res.data.data)
                });
            }
        })
    }

    Add(textbook) {
        console.log(textbook)
        let newBasket = this.state.basket;
        let replaced = false;
        for (let i = 0; i < newBasket.length; i++) {
            if (textbook.c.Id === newBasket[i].c.Id) {
                console.log(newBasket[i])
                if (newBasket[i].taht)
                    if (newBasket[i].taht.Taken) {
                        alert("Έχετε παραλάβει σύγγραμμα για αυτό το μάθημα.");
                        return;
                    }
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
            const semesterKey = `${Textbooks[i].c.Semester}`;
            const courseKey = `${Textbooks[i].c.Id}`;

            if (!Semesters.hasOwnProperty(Textbooks[i].c.Semester)) {
                Semesters[semesterKey] = {};
            }

            if (!Semesters[semesterKey].hasOwnProperty(Textbooks[i].c.Id)) {
                Semesters[semesterKey][courseKey] = {
                    textbooks: [],
                    id: Textbooks[i].c.Id,
                    name: Textbooks[i].c.Name
                };
            }

            Semesters[semesterKey][courseKey].textbooks.push(Textbooks[i]);
        }
        
        const SemesterKeys = Object.keys(Semesters);
        let retVal = [];

        for (let i = 0; i < SemesterKeys.length; i++) {
            let key = SemesterKeys[i];
            

            const CourseKeys = Object.keys(Semesters[key]);
            let sems = {
                name: key,
                courses: []
            };

            for (let j = 0; j < CourseKeys.length; j++) {
                let key2 = CourseKeys[j];
                sems.courses.push(Semesters[key][key2]);
            }
            
            retVal.push(sems);
        }

        return retVal;
    }

    isChosen(textbook) {
        console.log(textbook);
        for (let i = 0; i < this.state.basket.length; i++) {
            if (textbook.c.Id === this.state.basket[i].c.Id && textbook.t.Id === this.state.basket[i].t.Id) {
                return true;
            }
        }
        return false;
    }

    Apply() {
        const user = this.state.user ? this.state.user : this.getUser();
        if (user && user.Type !== "Student") {
            alert("Δεν δικαιούστε να κάνετε δήλωση. Παρακαλώ συνδεθείτε σε έναν φοιτητικό λογαριασμό")
            return;
        }

        const body = {
            new: this.state.basket,
            old: this.props.id ? this.props.id : null,
            user: this.getUser().Username
        }
    
        axios.post('/api/createTextbookApplication', body)
        .then(res => {
            if (res.data.error) {
                alert(res.data.message)
            }
            else {
                alert('Η Δήλωσή σας ήταν επιτυχής!');
                sessionStorage.removeItem("PendingTextbookApplication");
                browserHistory.push(`/actionpage/Student/1`)
            }
        })
    }

    saveData() {
        console.log("savedata")
        sessionStorage.setItem("PendingTextbookApplication", JSON.stringify(this.state.basket))
    }
    
    render() {
        const user = this.state.user ? this.state.user : this.getUser();
        
        const buttonClassName = this.state.basket.length !== 0 ? "ApplyButton" : "ApplyButton Disabled"
        const disabled = this.state.basket.length === 0 ? true : false;

        const buttonContent = user ? 
            <button className={buttonClassName} onClick={this.Apply} disabled={disabled}>
                Υποβολή Δήλωσης
            </button> 
            : 
            <LoginPopup signupRedirect={'StudentTextbookApplication'} 
                        className={buttonClassName} 
                        loginHandler={this.Apply} 
                        content="Υποβολή Δήλωσης"
                        saveData={this.saveData}
                        disabled={disabled}/>

        return (
            <div className="ApplicationManager">
                <h1>Δήλωση Συγγραμμάτων</h1>
                <div className="line"/>
                <Filters user={user} submit={this.Search}/>
                <TextbookContainer 
                    type={this.state.searchType}
                    textbooks={this.state.textbooksBySemester} 
                    adder={this.Add}
                    remover={this.Remove}
                    isChosen={this.isChosen}/>
                <Basket data={this.state.basket} Remove={this.Remove}/>
                {buttonContent}
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

        autoBind(this);
    }

    componentDidMount() {
        axios.post('/api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.data.message)
            }
            else {
                this.setState ( {
                    universities: res.data.data,
                    selecteduni: null,
                    udp: []
                });
            }
        })

        if (this.props.user) {
            axios.post('/api/getUserUniversityData', {user: this.props.user.Username})
            .then(res => {
                this.setState({
                    selecteduni: res.data.data.uid,
                    selectedudp: res.data.data.udpid
                })
            })
        }
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
                alert(res.data.message)
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
                alert(res.data.message);
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
                alert(res.data.message);
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
                alert(res.data.message);
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

        let content;
        if (props.groupBy)
        {
            let groups = {};
            for (let i = 0; i < props.data.length; i++) {
                const element = props.data[i];
                
                if (!groups.hasOwnProperty(element[props.groupBy])) {
                    groups[`${element[props.groupBy]}`] = [];
                }

                groups[`${element[props.groupBy]}`].push(element);
            }

            content = Object.keys(groups).map(key => {
                const group = groups[key];

                return (
                    <optgroup key={key} label={key + props.groupLabel}>
                        {
                            group.map(element => {
                                // console.log(element);
                                return <option key = {element.Id} value = {element.Id}>{element.Name}</option>
                            })
                        }
                    </optgroup>
                )
            })
        }
        else {
            content = props.data.map(element => {
                return (
                    <option key = {element.Id} value = {element.Id}>{element.Name}</option>
                );
            });
        }

        return (
            <label className="SearchBar">
                <p>{props.label}</p>
                <select 
                    type = "dropdown"
                    onChange = {props.onChange}
                    defaultValue={props.selected}
                    >
                    <option value = ''></option>
                    {content}
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
        const disabled = this.state.selectedudp ? false : true;
        const buttonClassName = this.state.selectedudp ? "SearchButton" : "SearchButton Disabled"
        return (
            <div className="Filters">
                <this.Dropdown label="Πανεπιστήμιο" onChange={this.getDepartments} data={this.state.universities} selected={this.state.selecteduni}/>
                <this.Dropdown label="Τμήμα" onChange={(event) => {this.getCourses(event); this.getSemesters(event); }} data={this.state.udp} selected={this.state.selectedudp}/>
                <this.Dropdown label="Εξάμηνο" onChange={this.getCoursesBySemester} data={this.state.semesters}/>
                <this.Dropdown label="Μάθημα" groupBy='Semester' groupLabel='ο Εξάμηνο:' onChange={this.handleCourse} data={this.state.courses}/>
                <label className="SearchBar">
                    <p>&nbsp;</p>
                    <button onClick={this.handleSubmit} className={buttonClassName} disabled={disabled}>
                        <img src={searchimg} className="SearchImg"/>
                    </button>
                </label>
            </div>
        )
    }
}



class TextbookContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let content;
        if (this.props.type === "Semester") {
            console.log(this.props.textbooks);
            content = this.props.textbooks[0].courses.map( (course, index) => {
                return <CourseDropdown 
                    options={course.textbooks} 
                    name={course.name} 
                    type="Course"
                    adder={this.props.adder}
                    remover={this.props.remover}
                    isChosen={this.props.isChosen}
                    key={course.name}/>
            });
        }
        else if (this.props.type === "Course") {
            content = this.props.textbooks[0].courses[0].textbooks.map(textbook => {
                return <Textbook 
                        data={textbook} 
                        adder={this.props.adder}
                        remover={this.props.remover}
                        isChosen={this.props.isChosen}
                        key={`${textbook.c.Id}${textbook.t.Id}`}/>
            })
        }
        else {
            content = this.props.textbooks.map(sem => {
                return <SemesterDropdown    options={sem.courses} 
                                            name={sem.name}
                                            type="Semester"
                                            adder={this.props.adder}
                                            remover={this.props.remover}
                                            isChosen={this.props.isChosen}
                                            key={sem.name}/>
            });
        }

        return (
            <div className = "TextbookContainer">
                {content}
            </div>
        )
    }
}


class SemesterDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        autoBind(this);
    }

    onClick() {
        this.setState({open: !this.state.open});
    }

    render() {
        let options;
        if (this.state.open) {

            options = this.props.options.map( (option, index) => {
                return <CourseDropdown 
                        options={option.textbooks} 
                        name={option.name} 
                        type="Course"
                        adder={this.props.adder}
                        remover={this.props.remover}
                        isChosen={this.props.isChosen}
                        key={option.name}/>
            })

        }

        return (
            <div className="SemesterDropdown">
                <button onClick={this.onClick}>{this.props.name}ο Εξάμηνο &nbsp; &#9660;</button>
                <div className="Courses">{this.state.open ? options : null}</div>
            </div>
        )
    }
}

class CourseDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        autoBind(this);
    }

    onClick() {
        this.setState({open: !this.state.open});
    }

    render() {
        let options;
        if (this.state.open) {

            options = this.props.options.map(option => {
                return <Textbook 
                        data={option} 
                        adder={this.props.adder}
                        remover={this.props.remover}
                        isChosen={this.props.isChosen}
                        key={`${option.c.Id}${option.t.Id}`}/>
            })

        }

        return (
            <div className="CourseDropdown">
                <button onClick={this.onClick}>{this.props.name} &nbsp; &#9660;</button>
                {this.state.open ? <div className="Textbooks"> {options} </div> : null}
            </div>
        )
    }
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
            <p className="Writer">{props.data.t.Writer}</p>
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

class Basket extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.data.map( (tb, index) => {
            const even = index % 2 === 0 ? "Even": "Odd"
            return (
                <div key={tb.c.Id} className={`BasketEntry ${even}`}>
                    <div>
                        <p className="BasketEntryName">{tb.t.Name}</p>
                        <p className="BasketEntryCourse">{tb.c.Name}</p>
                    </div>
                    <button className="BasketRemoveButton" onClick={() => {this.props.Remove(tb)}}>
                        <img src={deleteimg}/>
                    </button>
                </div>
            )
        })

        return (
            items.length ?

                <div className="Basket">
                    <h3>Επιλεγμένα Συγγράμματα</h3>
                    <div className="BasketEntries">
                        {items}
                    </div>
                </div>
                :
                null
        )
    }
}