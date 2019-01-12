import React, {Component} from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import {browserHistory} from 'react-router';
import LoginPopup from '../Login';

import "../../css/Student/ApplicationManager.css"
import searchimg from "../../images/search.png"
import deleteimg from "../../images/trash.png"
import {SimpleDropdown, ComboDropdown} from '../Utilities';

import Popup from 'reactjs-popup'

// import Select from 'react-select';
// import createFilterOptions from 'react-select-fast-filter-options';

// import {TextbookPopup} from './ApplicationPresenter'

export default class ApplicationManager extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            textbooks: [],
            basket: [],
            textbooksBySemester: [],
            searchType: null,
            user: null,
            oldApplication: null
        }
    }

    getCurrentApplication(user) {
        console.log("klhuhka");
        if (user) {
            axios.post("/api/getCurrentTextbookApplication", {user: user ? user.Username : null})
            .then(res => {
                if (res.data.error) {
                    this.setState({
                        basket: [],
                        oldApplication: null
                    })
                }
                else {
                    this.setState({
                        basket: res.data.data,
                        user: user,
                        oldApplication: res.data.data[0].ta.Id
                    })
                }
            })
        }
        else {
            this.setState({
                user : null,
                basket: [],
                oldApplication: null
            })
        }
    }

    componentDidMount() {
        const user = this.getUser();

        let application = sessionStorage.getItem("PendingTextbookApplication");
        if (application) {
            application = JSON.parse(application);
            this.setState({
                basket: application
            })
        }
        else {
            this.getCurrentApplication(user)
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.login !== this.props.login) {
            this.getCurrentApplication(this.getUser());
            return true;
        }

        return true;
    }

    getUser() {
        const user = JSON.parse(sessionStorage.getItem('EudoxusUser'));
        return user;
    }

    loginHandler() {
        console.log("lol");
        this.props.loginHandler();
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
                if (this.state.basket[i].taht) {
                    if (this.state.basket[i].taht.Taken) {
                        alert("Έχετε παραλάβει σύγγραμμα για αυτό το μάθημα. Δεν μπορείτε να το διαγράψετε.");
                    }
                    else continue;
                }
                else continue;
            }

            newBasket.push(this.state.basket[i]);
        }
        console.log(newBasket);
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
            old: this.state.oldApplication,
            user: user.Username
        }
        console.log(body);
        if (confirm("Είστε σίγουροι για την δήλωσή σας;"))
        {
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
    }

    saveData() {
        console.log(this.state.basket)
        sessionStorage.setItem("PendingTextbookApplication", JSON.stringify(this.state.basket))
    }
    
    render() {
        const user = this.state.user ? this.state.user : this.getUser();
        
        const buttonClassName = this.state.basket && this.state.basket.length !== 0 ? "ApplyButton" : "ApplyButton Disabled"
        const disabled = this.state.basket && this.state.basket.length === 0 ? true : false;

        const buttonContent = user ? 
            <button className={buttonClassName} onClick={this.Apply} disabled={disabled}>
                Υποβολή Δήλωσης
            </button> 
            : 
            <LoginPopup signupRedirect={'StudentTextbookApplication'} 
                        className={buttonClassName} 
                        loginHandler={ () => {this.loginHandler()} }
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
        if (this.props.user) {
            axios.post('/api/getUserUniversityData', {user: this.props.user.Username})
            .then(res => {
                this.setState({
                    selecteduni: res.data.data.uid,
                    selectedudp: res.data.data.udpid
                })
            })
        }

        axios.post('/api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.data.message)
            }
            else {
                let newState = this.state;
                newState.universities = res.data.data.map(element => {return {value: element.Id, label: element.Name} })
                newState.universities.unshift({value: "", label: " "})
                newState.selecteduni = null;
                newState.udp = [];
                this.setState(newState);
            }
        })

        
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event.value
        });

        if (event.value === '') {
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
            university: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.data.message)
            }
            else {
                let newState = this.state;
                newState.udp = res.data.data.map(element => {return {value: element.Id, label: element.Name} })
                newState.udp.unshift({value: "", label: " "})
                this.setState(newState);
            }
        })
    }

    getSemesters(event) {
        this.setState({
            selectedudp: event.value
        });

        if (event.value === '') {
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
            udp: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.data.message);
            }
            else {
                let newState = this.state;
                newState.semesters = res.data.data.map(element => {return {value: element.Id, label: element.Name} })
                newState.semesters.unshift({value: "", label: " "})
                this.setState(newState);
            }
        })
    }

    getCourses(event) {
        this.setState({
            selectedudp: event.value
        });

        if (event.value === '') {
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
            udp: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.data.message);
            }
            else {
                let newState = this.state;
                newState.courses = res.data.data.map(element => {return {value: element.Id, label: element.Name} })
                newState.courses.unshift({value: "", label: " "})
                this.setState(newState);
            }
        })
    }

    getCoursesBySemester(event) {
        this.setState({
            selectedsemester: event.value
        });

        if (event.value === '') {
            this.setState({
                selectedsemester: null
            })
            return this.getCourses({target: {value: this.state.selectedudp}});
        }

        axios.post('/api/getCourses/Semesters', {
            udp: this.state.selectedudp,
            semester: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.data.message);
            }
            else {
                let newState = this.state;
                newState.courses = res.data.data.map(element => {return {value: element.Id, label: element.Name} })
                newState.courses.unshift({value: "", label: " "})
                this.setState(newState);
            }
        })

    }

    handleCourse(event) {
        this.setState({
            selectedcourse: event.value
        })
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
                <ComboDropdown  label="Πανεπιστήμιο"
                                placeholder=""
                                options={this.state.universities} 
                                onChange={this.getDepartments} 
                                defaultValue={this.state.selecteduni}/>

                <ComboDropdown  label="Τμήμα"
                                placeholder=""
                                options={this.state.udp} 
                                onChange={(event) => {this.getCourses(event); this.getSemesters(event);}} 
                                defaultValue={this.state.selectedudp}/>

                <ComboDropdown  label="Εξάμηνο"
                                placeholder=" "
                                options={this.state.semesters} 
                                onChange={this.getCoursesBySemester} />

                <ComboDropdown  label="Μάθημα"
                                placeholder=""
                                options={this.state.courses} 
                                onChange={this.handleCourse} />

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
            <div>
                <div className="TextbookInfo">
                    
                    <p className="Writer">{props.data.t.Writer}</p>
                    <p>{props.data.t.Date_Published.split('-')[0]}</p>
                    <p>{"ISBN: " + props.data.t.ISBN}</p>
                    <p>{props.data.p.Name}</p>

                </div>

                {/* <div className="TextbookInfo">
                    <p className="Writer">{props.data.dp.Name}</p>
                    <p>{props.data.a.Street_Name} {props.data.a.Street_Number}, {props.data.a.City} {props.data.a.ZipCode}</p>
                    <p>{props.data.dp.Phone}</p>
                    <p>{props.data.dp.Working_Hours}</p>

                </div> */}
            </div>
            
            
 
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


export function TextbookPopup(props) {
    const tb = props.data;
    const title = tb.taht && tb.taht.Taken ? "Το σύγγραμμα αυτό έχει ήδη παρθεί ή η προθεσμία έχει λήξει" : null

    const buttonTitle = tb.taht && tb.taht.Taken ? "Δεν μπορείτε να αφαιρέσετε αυτό το σύγγραμμα" : "Αφαίρεση Συγγράμματος";
    const buttonClass = tb.taht && tb.taht.Taken ? "BasketRemoveButton Disabled" : "BasketRemoveButton"
    const disabled = tb.taht && tb.taht.Taken;

    return (
        <Popup 
            className = "TextbookPopup"
            trigger = { open => (
                <div title={title} className={open ? `TextbookPopupButton Open ${props.className}` : `TextbookPopupButton Closed ${props.className}`}>
                    <p className="BasketPopupEntryName">{tb.t.Name}</p>
                    <p className="BasketPopupEntryCourse">{tb.c.Name} - {tb.c.Semester}o Εξάμηνο</p>
                </div>
            )}
            closeOnDocumentClick
            on="hover"
            position="left center"
            arrow={true}
        >
            <div className="TextbookPopupContent">
                <h3>{tb.t.Name}</h3>

                <div className="line"/> 

                <div className="AllContent">
                    <div className="Info Content">  
                        <h4>Στοιχεία</h4>  
                        <p>{tb.t.Writer}</p>
                        <p>{tb.t.Date_Published.split('-')[0]}</p>
                        <p>ISBN: {tb.t.ISBN}</p>
                        <p>{tb.p.Name}</p>
                    </div>
                        
                    <div onClick={() => {
                        var win = window.open(`https://www.google.com/maps/search/?api=1&query=
                        ${tb.a.Street_Name}+${tb.a.Street_Number}%2C+${tb.a.City}+${tb.a.ZipCode}`);
                        win.focus();
                    }} className="Distributor Content" title='Ανοίξτε στο Google-Maps'>
                        <h4>Σημείο Διανομής</h4>
                        <p>{tb.dp.Name}</p>
                        <p>{tb.a.Street_Name} {tb.a.Street_Number}, {tb.a.City} {tb.a.ZipCode}</p>
                        <p>{tb.dp.Phone}</p>
                        <p>{tb.dp.Working_Hours}</p>
                        <p>{tb.dpht.Copies + " Αντίτυπα"}</p>
                    </div>
                </div>
                
            </div>
            
        </Popup>
    )
}



class Basket extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items;
        if (this.props.data)
            items = this.props.data.map( (tb, index) => {
                const even = index % 2 === 0 ? "Even": "Odd"

                const buttonTitle = tb.taht && tb.taht.Taken ? "Δεν μπορείτε να αφαιρέσετε αυτό το σύγγραμμα" : "Αφαίρεση Συγγράμματος";
                const buttonClass = tb.taht && tb.taht.Taken ? "BasketRemoveButton Disabled" : "BasketRemoveButton"
                const disabled = tb.taht && tb.taht.Taken;

                return (
                    <div key={tb.c.Id} className={`BasketEntry ${even}`}>
                        <TextbookPopup className={`BasketPopupEntry ${even}`} data={tb} onClick={() => {this.props.Remove(tb)}}/>
                        <button title={buttonTitle} className={buttonClass} onClick={() => {this.props.Remove(tb)}} disabled={disabled}>
                            <img src={deleteimg}/>
                        </button>
                    </div>
                    
                )

                return (
                    <div key={tb.c.Id} className={`BasketEntry ${even}`}>
                        <div>
                            <p className="BasketEntryName">{tb.t.Name}</p>
                            <p className="BasketEntryCourse">{tb.c.Name} - {tb.c.Semester}o Εξάμηνο</p>
                        </div>
                        <button title={buttonTitle} className={buttonClass} onClick={() => {this.props.Remove(tb)}} disabled={disabled}>
                            <img src={deleteimg}/>
                        </button>
                    </div>
                )
            })
        else {
            items = null;
        }

        return (
            items && items.length ?

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