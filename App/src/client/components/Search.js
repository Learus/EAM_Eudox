import React, {Component} from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import "../css/Search.css";

import {browserHistory} from 'react-router'

import {SimpleDropdown, ComboDropdown, UltraComboDropdown} from './Utilities';
import FormTextInput from './Utilities'
import Header from './Header'

export default class Search extends Component {
    constructor(props) {
        super (props);

        const choices = ['Textbook', 'Publisher', 'Distributor'];
        console.log( this.props.params.active)

        this.state = {
            active: choices[parseInt(this.props.params.active)],
            data: null
        }

        autoBind(this);
    }

    shouldComponentUpdate(nextProps) {
        const choices = ['Textbook', 'Publisher', 'Distributor'];
        if (nextProps.location !== this.props.location) {
            this.setState({
                active: choices[parseInt(nextProps.params.active)]
            });
        }
        return true;
    }

    retrieveData(data) {
        this.setState({
            data: data
        })
    }

    SearchCategoryButton(props) {
        return (
            <button className={this.state.active === props.active ? "SearchCategoryButton Active " + props.active : 
                                                                    "SearchCategoryButton " + props.active} 
                    onClick={ () => {this.setState({active: props.active})}}>
                {props.label}
            </button>
        )
    }

    render() {
        let actionList = null;
        switch(this.state.active) {
            case "Textbook" : 
                actionList = <TextbookSearch return={this.retrieveData}/>;
                break;
            case "Publisher" : 
                actionList = <PublisherSearch return={this.retrieveData}/>;
                break;
            case "Distributor" : 
                actionList = <DistributorSearch return={this.retrieveData}/>;
                break;

        }

        return (
            <div className="SearchPage">
                <Header/>
                <div className="SideBar">

                    <div className="SearchCategoryButtons">
                        <this.SearchCategoryButton active="Textbook" label="Σύγραμματα"/>
                        <this.SearchCategoryButton active="Publisher" label="Εκδότες"/>
                        <this.SearchCategoryButton active="Distributor" label="Σημεία Διανομής"/>
                    </div>
                    {actionList}

                </div>
                
                <Main data={this.state.data}/>
            </div>
        )
    }
}

function Main(props) {

    return (
        <div className="Main">
            {props.data}
        </div>
    )
}



class TextbookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            udp: [],
            names: [],
            writers: [],
            isbns: [],
            keywords: [],
            publishers: [],
            distributors: [],
            courses: []
        }
        autoBind(this);
    }

    getOptions(path, key) {
        axios.get(path)
        .then(res => {
            if (res.data.error) {
                console.error(res.message);
            }
            else {
                let newState = this.state;
                newState[key] = res.data.data.map(element => {return {value: element.Id.toString(), label: element.Name} })
                if (key !== "keywords")
                    newState[key].unshift({value: "", label: " "})
                this.setState(newState);
            }
        })
    }

    componentDidMount() {
        this.getOptions('/api/getTextbookNames', "names");
        this.getOptions('/api/getTextbookWriters', "writers");
        this.getOptions('/api/getTextbookISBNs', "isbns");
        this.getOptions('/api/getKeywords', "keywords");
        this.getOptions('/api/getPublishers', "publishers");
        this.getOptions('/api/getDistributors', "distributors");
        this.getOptions('/api/getAllCourses', "courses");
        this.getOptions('/api/getAllDepartments', "udp");
        
        axios.post('/api/getUniversities')
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                let newState = {};
                newState.universities = res.data.data.map(uni => {return {value: uni.Id.toString(), label: uni.Name}});
                newState.universities.unshift( {value: "", label: " "} );
                newState.udp = [];
                newState.selecteduni = null;
                this.setState (newState);
            }
        })
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event.value
        });

        axios.post('/api/getDepartments', {
            university: event.value
        })
        .then(res => {
            if (res.data.error) {
                alert(res.message)
            }
            else {
                let newState = {};
                newState.udp = res.data.data.map(udp => {return {value: udp.Id.toString(), label: udp.Name}});
                newState.udp.unshift( {value: "", label: " "} );
                newState.selectedudp = null;
                this.setState (newState);
            }
        })
    }

    hname(event) {
        this.setState({selectedname: event.value});
    }

    hwriter(event) {
        this.setState({selectedwriter: event.value});
    }

    hisbn(event) {
        this.setState({selectedisbn: event.value});
    }

    hkeyword(event) {
        this.setState({selectedkeywords: event.map(word => {return word.value})});
    }

    hpublisher(event) {
        this.setState({selectedpublisher: event.value});
    }

    hdistributor(event) {
        this.setState({selecteddistributor: event.value});
    }

    huniversity(event) {
        this.setState({selecteduni: event.value});

        if (event.value === '') {
            this.getOptions('/api/getAllDepartments', "udp");
            this.setState({
                selectedudp: null,
                selecteduni: null,
            })
            return;
        };
    }

    hudp(event) {
        this.setState({
            selectedudp: event.value
        });

        if (event.value === '') {
            this.getOptions('/api/getAllCourses', "courses");
            this.setState({
                selectedudp: null,
                selectedcourse: null,
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
                this.setState({
                    courses: res.data.data.map(course => {return {value: course.Id.toString(), label: course.Name}}),
                })
            }
        })
    }

    hcourse(event) {
        this.setState({selectedcourse: event.value});
    }

    Search() {
        const send = {};

        if (this.state.selectedname && this.state.selectedname !== '') send.name = this.state.selectedname;

        if (this.state.selectedwriter && this.state.selectedwriter !== '') send.writer = this.state.selectedwriter;

        if (this.state.selectedisbn && this.state.selectedisbn !== '') send.isbn = parseInt(this.state.selectedisbn);

        if (this.state.selectedpublisher && this.state.selectedpublisher !== '') send.publisher = this.state.selectedpublisher;

        if (this.state.selecteddistributor && this.state.selecteddistributor !== '') {
            // if Distributor is a new "keyword"
            if (isNaN(parseInt(this.state.selecteddistributor)))
                send.distributor = this.state.selecteddistributor;
            else 
                send.distributor = parseInt(this.state.selecteddistributor);
        }

        if (this.state.selectedkeywords && this.state.selectedkeywords.length !== 0) {
            send.keywords = [];

            for (let i = 0; i < this.state.selectedkeywords.length; i++) {
                const word = this.state.selectedkeywords[i];

                // if keyword does not exist
                if (word === '') continue
                if (isNaN(parseInt(word))) {
                    send.keywords.push(word);
                }
                else {
                    send.keywords.push(parseInt(word));
                }
            }
            send.keywords = this.state.selectedkeywords;
        }

        if (this.state.selecteduni && this.state.selecteduni !== '') send.uni = this.state.selecteduni;

        if (this.state.selectedudp && this.state.selectedudp !== '') send.udp = this.state.selectedudp;

        if (this.state.selectedcourse && this.state.selectedcourse !== ''){
            // if course is a new "keyword"
            if (isNaN(parseInt(this.state.selectedcourse)))
                send.course = this.state.selectedcourse;
            else 
                send.course = parseInt(this.state.selectedcourse);
        }



        if (Object.keys(send).length !== 0) {
            console.log("​TextbookSearch -> Search -> send", send)

            axios.post('/api/searchTextbooks', send)
            .then(res => {
                if (res.data.error) {
                    console.error(res.data.error);
                }
                else {
                    console.log(res.data.data)
                    this.setState({
                        results: res.data.data
                    })
                }
            })
        }
        
    }

    render() {
        return (
            <div className="TextbookSearch Search">
                <h2>Αναζήτηση Συγγραμμάτων</h2>
                <div className="Inputs">

                <UltraComboDropdown  label="Όνομα Συγγράμματος"      
                                // placeholder="Η Μηχανική και Εγώ, C++"
                                options={this.state.names} 
                                onChange={this.hname} 
                                defaultValue=''/>

                <UltraComboDropdown  label="Συγγραφέας"      
                                // placeholder="Ιωάννης Ιωάννου, Δρακονταειδής, Τριβιζ"
                                options={this.state.writers} 
                                onChange={this.hwriter} 
                                defaultValue=''/>

                <ComboDropdown  label="ISBN"      
                                // placeholder="1234567890123, 6547"
                                options={this.state.isbns} 
                                onChange={this.hisbn} 
                                defaultValue=''/>

                <UltraComboDropdown  label="Λέξεις Κλειδιά"      
                                // placeholder="Μηχανική, Φρόυντ, Γλώσσα"
                                options={this.state.keywords} 
                                onChange={this.hkeyword} 
                                isMulti={true}
                                defaultValue=''/>

                <ComboDropdown  label="Εκδότης"      
                                // placeholder="Εκδόσεις Κνωσσός, Κνωσσός"
                                options={this.state.publishers} 
                                onChange={this.hpublisher} 
                                defaultValue=''/>

                <UltraComboDropdown  label="Σημείο Διανομής"      
                                // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                options={this.state.distributors} 
                                onChange={this.hdistributor} 
                                defaultValue=''/>

                <ComboDropdown  label="Πανεπιστήμιο"      
                                // placeholder=""
                                options={this.state.universities} 
                                onChange={this.getDepartments} 
                                defaultValue=''/>

                <ComboDropdown  label="Τμήμα"
                                // placeholder=""
                                options={this.state.udp} 
                                onChange={this.hudp} 
                                defaultValue=''/>

                <UltraComboDropdown  label="Μάθημα"
                                // placeholder=""
                                options={this.state.courses} 
                                onChange={this.hcourse} 
                                defaultValue=''/>
                </div>

                <button className="SearchButton Textbook" onClick={this.Search}>
                    Αναζήτηση
                </button>
            </div>
            
        )
    }
}

class PublisherSearch extends Component {
    constructor(props) {
        super(props);

        autoBind(this);
    }

    render() {
        return (
            <div className="PublisherSearch Search">
                <h2>Αναζήτηση Εκδοτών</h2>
                <div className="Inputs">
                
                </div>
            </div>
        )
    }
}

class DistributorSearch extends Component {
    constructor(props) {
        super(props);

        autoBind(this);
    }

    render() {
        return (
            <div className="DistrubutorSearch Search">
                <h2>Αναζήτηση Σημείων Διανομής</h2>
                <div className="Inputs">
                
                </div>
            </div>
        )
    }
}