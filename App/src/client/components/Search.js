import React, {Component} from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import "../css/Search.css";

import {browserHistory} from 'react-router'
// import loadinggif from "../images/Loading_icon.gif"

import {SimpleDropdown, ComboDropdown, UltraComboDropdown} from './Utilities';
import FormTextInput from './Utilities'
import Header from './Header'
import ReactLoading from 'react-loading';

export default class Search extends Component {
    constructor(props) {
        super (props);

        const choices = ['Textbook', 'Publisher', 'Distributor'];

        this.state = {
            active: choices[parseInt(this.props.params.active)],
            data: null,
            loading: false
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
        const choices = ['Textbook', 'Publisher', 'Distributor'];

        return (
            <button className={this.state.active === props.active ? "SearchCategoryButton Active " + props.active : 
                                                                    "SearchCategoryButton " + props.active} 
                    onClick={ () => {browserHistory.push(`/search/${choices.indexOf(props.active)}`);}}>
                {props.label}
            </button>
        )
    }

    render() {
        let actionList = null;
        switch(this.state.active) {
            case "Textbook" : 
                actionList = <TextbookSearch return={this.retrieveData} loading={() => {this.setState({loading: !this.state.loading})}}/>;
                break;
            case "Publisher" : 
                actionList = <PublisherSearch return={this.retrieveData} loading={() => {this.setState({loading: !this.state.loading})}}/>;
                break;
            case "Distributor" : 
                actionList = <DistributorSearch return={this.retrieveData} loading={() => {this.setState({loading: !this.state.loading})}}/>;
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
                
                <Main data={this.state.data} loading={this.state.loading}/>
            </div>
        )
    }
}

function Main(props) {
    console.log(props)
    let display;
    if (!props.data && !props.loading) {
        display = null;
    }
    else if(!props.data && props.loading) {
        display = <ReactLoading className="LoadingGif" color="#6495ed" type="spin" width="150px" height="150px"/>
    }
    else {
        if (props.data.length === 0) {
            display = <h3 className="EmptyResults">Η Αναζήτησή σας δεν έφερε αποτελέσματα...</h3>;
        }
        else {
            display = props.data;
        }
    }

    return (
        <div className="Main">
            {display}
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
            courses: [],
            searching: false
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
                    newState[key].unshift({value: '', label: ''})
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
                newState.universities.unshift( {value: '', label: ''} );
                newState.selecteduni = {value: '', label: ''};
                this.setState (newState);
            }
        })
    }

    getDepartments(event) {
        this.setState({
            selecteduni: event
        });

        if (!event.value || event.value === '') {
            this.getOptions('/api/getAllDepartments', "udp");
            this.setState({
                selectedudp: {value: '', label: ''},
                selectedcourse: {value: '', label: ''}
            })
            return;
        }

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
                newState.udp.unshift( {value: '', label: ''} );
                newState.selectedudp = {value: '', label: ''};
                newState.selectedcourse = {value: '', label: ''};
                this.setState (newState);
            }
        })
    }

    hname(event) {
        this.setState({selectedname: event});
    }

    hwriter(event) {
        this.setState({selectedwriter: event});
    }

    hisbn(event) {
        this.setState({selectedisbn: event});
    }

    hkeyword(event) {
        this.setState({selectedkeywords: event.map(word => {return word})});
    }

    hpublisher(event) {
        this.setState({selectedpublisher: event});
    }

    hdistributor(event) {
        this.setState({selecteddistributor: event});
    }

    hudp(event) {
        this.setState({
            selectedudp: event
        });

        if (event.value === '') {
            this.getOptions('/api/getAllCourses', "courses");
            this.setState({
                selectedudp: {value: '', label: ''},
                selectedcourse: {value: '', label: ''},
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
                newState.courses = res.data.data.map(course => {return {value: course.Id.toString(), label: course.Name}});
                newState.courses.unshift({value: '', label: ''});
                newState.selectedcourse = {value: '', label: ''};
                this.setState(newState);
            }
        })
    }

    hcourse(event) {
        this.setState({selectedcourse: event});
    }

    Search() {
        const send = {};

        if (this.state.selectedname && this.state.selectedname.value && this.state.selectedname.value !== '') send.name = this.state.selectedname.value;

        if (this.state.selectedwriter && this.state.selectedwriter.value && this.state.selectedwriter.value !== '') send.writer = this.state.selectedwriter.value;

        if (this.state.selectedisbn && this.state.selectedisbn.value && this.state.selectedisbn.value !== '') send.isbn = parseInt(this.state.selectedisbn.value);

        if (this.state.selectedpublisher && this.state.selectedpublisher.value && this.state.selectedpublisher.value !== '') send.publisher = this.state.selectedpublisher.value;

        if (this.state.selecteddistributor && this.state.selecteddistributor.value && this.state.selecteddistributor.value !== '') {
            // if Distributor is a new "keyword"
            if (isNaN(parseInt(this.state.selecteddistributor.value)))
                send.distributor = this.state.selecteddistributor.value;
            else 
                send.distributor = parseInt(this.state.selecteddistributor.value);
        }

        if (this.state.selectedkeywords && this.state.selectedkeywords.length !== 0) {
            console.log(this.state.selectedkeywords)
            send.keywords = [];

            for (let i = 0; i < this.state.selectedkeywords.length; i++) {
                const word = this.state.selectedkeywords[i].value;
				console.log("​Search -> word", word)

                // if keyword does not exist
                if (!word || word === '') continue
                if (isNaN(parseInt(word))) {
                    send.keywords.push(word);
                }
                else {
                    send.keywords.push(parseInt(word));
                }
            }

            console.log(send.keywords)
        }

        if (this.state.selecteduni && this.state.selecteduni.value && this.state.selecteduni.value !== '') send.uni = this.state.selecteduni.value;

        if (this.state.selectedudp && this.state.selectedudp.value && this.state.selectedudp.value !== '') send.udp = this.state.selectedudp.value;

        if (this.state.selectedcourse && this.state.selectedcourse.value && this.state.selectedcourse.value !== ''){
            // if course is a new "keyword"
            if (isNaN(parseInt(this.state.selectedcourse.value)))
                send.course = this.state.selectedcourse.value;
            else 
                send.course = parseInt(this.state.selectedcourse.value);
        }


        this.props.loading();
        this.props.return(null);
       
        axios.post('/api/searchTextbooks', send)
        .then(res => {
            if (res.data.error) {
                console.error(res.data.message);

                this.setState({
                    data: []
                }, () => {this.props.return(this.state.data)})
            }
            else {
                console.log(res.data.data)
                
                this.setState({
                    data: res.data.data.map(tb => {
                        return <TextbookSearchDisplay key={tb.t.Id} data={tb}/>
                    })
                }, () => {this.props.return(this.state.data)})
                
            }
            
            this.props.loading();
        })
        
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
                                    defaultValue=''
                                    value={this.state.selectedname}/>

                    <UltraComboDropdown  label="Λέξεις Κλειδιά"      
                                    // placeholder="Μηχανική, Φρόυντ, Γλώσσα"
                                    options={this.state.keywords} 
                                    onChange={this.hkeyword} 
                                    isMulti={true}
                                    defaultValue=''
                                    value={this.state.selectedkeywords}/>

                    <UltraComboDropdown  label="Συγγραφέας"      
                                    // placeholder="Ιωάννης Ιωάννου, Δρακονταειδής, Τριβιζ"
                                    options={this.state.writers} 
                                    onChange={this.hwriter} 
                                    defaultValue=''
                                    value={this.state.selectedwriter}/>

                    <ComboDropdown  label="ISBN"      
                                    // placeholder="1234567890123, 6547"
                                    options={this.state.isbns} 
                                    onChange={this.hisbn} 
                                    defaultValue=''
                                    value={this.state.selectedisbn}/>

                    <ComboDropdown  label="Εκδότης"      
                                    // placeholder="Εκδόσεις Κνωσσός, Κνωσσός"
                                    options={this.state.publishers} 
                                    onChange={this.hpublisher} 
                                    defaultValue=''
                                    value={this.state.selectedpublisher}/>

                    <UltraComboDropdown  label="Σημείο Διανομής"      
                                    // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                    options={this.state.distributors} 
                                    onChange={this.hdistributor} 
                                    defaultValue=''
                                    value={this.state.selecteddistributor}/>

                    <ComboDropdown  label="Πανεπιστήμιο"      
                                    // placeholder=""
                                    options={this.state.universities} 
                                    onChange={this.getDepartments} 
                                    defaultValue=''
                                    value={this.state.selecteduni}/>

                    <ComboDropdown  label="Τμήμα"
                                    // placeholder=""
                                    options={this.state.udp} 
                                    onChange={this.hudp} 
                                    defaultValue=''
                                    value={this.state.selectedudp}/>

                    <UltraComboDropdown  label="Μάθημα"
                                    // placeholder=""
                                    options={this.state.courses} 
                                    onChange={this.hcourse} 
                                    defaultValue=''
                                    value={this.state.selectedcourse}/>
                </div>

                <button className="SearchButton Textbook" onClick={this.Search}>
                    Αναζήτηση
                </button>
            </div>
            
        )
    }
}

export function TextbookSearchDisplay(props) {
    const tb = props.data;

    return (
        <div className="TextbookPopupContent TextbookSearchDisplay SearchDisplay">
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

                <div className="Publisher Content">
                    <h4>Εκδότης</h4>
                    <p>{tb.p.Name}</p>
                    <p>{tb.p.Phone}</p>
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
    )
}

class PublisherSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            names: [],
            phones: [],
            streets: [],
            zipcodes: [],
            cities: []
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
                console.log(res.data.data)
                let newState = this.state;
                newState[key] = res.data.data.map(element => {return {value: element.Id.toString(), label: element.Name} })
                newState[key].unshift({value: '', label: ''})
                this.setState(newState);
            }
        })
    }

    componentDidMount() {
        this.getOptions('/api/getPublisherNames', "names");
        this.getOptions('/api/getPublisherPhones', "phones");
        this.getOptions('/api/getPublisherStreets', "streets");
        this.getOptions('/api/getPublisherZipcodes', "zipcodes");
        this.getOptions('/api/getPublisherCities', "cities");
    }

    hname(event) {
        this.setState({selectedname: event.value});
    }

    hphone(event) {
        this.setState({selectedphone: event.value});
    }

    hstreet(event) {
        this.setState({selectedstreet: event.value});
    }

    hzipcode(event) {
        this.setState({selectedzipcode: event.value});
    }

    hcity(event) {
        this.setState({selectedcity: event.value});
    }

    Search() {
        const send = {};

        if (this.state.selectedname && this.state.selectedname !== '') send.name = this.state.selectedname;

        if (this.state.selectedphone && this.state.selectedphone !== '') send.phone = this.state.selectedphone;

        if (this.state.selectedstreet && this.state.selectedstreet !== '') send.street = this.state.selectedstreet;

        if (this.state.selectedzipcode && this.state.selectedzipcode !== '') send.zipcode = this.state.selectedzipcode;

        if (this.state.selectedcity && this.state.selectedcity !== '') send.city = this.state.selectedcity;

        console.log(send);

        this.props.loading();
        this.props.return(null);

        axios.post('/api/searchPublishers', send)
        .then(res => {
            if (res.data.error) {
                console.error(res.data.message);

                this.setState({
                    data: []
                }, () => {this.props.return(this.state.data)})
            }
            else {
                this.setState({
                    data: res.data.data.map(pub => {
                        return <PublisherSearchDisplay key={pub.p.Username} data={pub}/>
                    })
                }, () => {this.props.return(this.state.data)})

                
            }

            this.props.loading()
        })
    }

    render() {
        return (
            <div className="PublisherSearch Search">
                <h2>Αναζήτηση Εκδοτών</h2>
                <div className="Inputs">
                    <UltraComboDropdown  label="Όνομα Εκδότη"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.names} 
                                        onChange={this.hname} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Τηλέφωνο Εκδότη"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.phones} 
                                        onChange={this.hphone} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Οδός"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.streets} 
                                        onChange={this.hstreet} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Τ.Κ."      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.zipcodes} 
                                        onChange={this.hzipcode} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Πόλη"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.cities} 
                                        onChange={this.hcity} 
                                        defaultValue=''/>
                </div>

                <button className="SearchButton Publisher" onClick={this.Search}>
                        Αναζήτηση
                </button>
            </div>
        )
    }
}

function PublisherSearchDisplay(props) {
    const pub = props.data;

    return (
        <div className="TextbookPopupContent PublisherSearchDisplay SearchDisplay">
            <h3>{pub.p.Name}</h3>

            <div className="line"/>

            <div className="AllContent">               
                <div onClick={() => {
                    var win = window.open(`https://www.google.com/maps/search/?api=1&query=
                    ${pub.a.Street_Name}+${pub.a.Street_Number}%2C+${pub.a.City}+${pub.a.ZipCode}`);
                    win.focus();
                }} className="Publisher Content" title='Ανοίξτε στο Google-Maps'>
                    <h4>Πληροφορίες</h4>
                    <p>{pub.p.Phone}</p>
                    <p>{pub.a.Street_Name} {pub.a.Street_Number}, {pub.a.City} {pub.a.ZipCode}</p>
                </div>
            </div>
            
        </div>
    )
}

class DistributorSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            names: [],
            phones: [],
            streets: [],
            zipcodes: [],
            cities: []
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
                newState[key].unshift({value: '', label: ''})
                this.setState(newState);
            }
        })
    }

    componentDidMount() {
        this.getOptions('/api/getDistributorNames', "names");
        this.getOptions('/api/getDistributorPhones', "phones");
        this.getOptions('/api/getDistributorStreets', "streets");
        this.getOptions('/api/getDistributorZipcodes', "zipcodes");
        this.getOptions('/api/getDistributorCities', "cities");
    }

    hname(event) {
        this.setState({selectedname: event.value});
    }

    hphone(event) {
        this.setState({selectedphone: event.value});
    }

    hstreet(event) {
        this.setState({selectedstreet: event.value});
    }

    hzipcode(event) {
        this.setState({selectedzipcode: event.value});
    }

    hcity(event) {
        this.setState({selectedcity: event.value});
    }

    Search() {
        const send = {};

        if (this.state.selectedname && this.state.selectedname !== '') send.name = this.state.selectedname;

        if (this.state.selectedphone && this.state.selectedphone !== '') send.phone = this.state.selectedphone;

        if (this.state.selectedstreet && this.state.selectedstreet !== '') send.street = this.state.selectedstreet;

        if (this.state.selectedzipcode && this.state.selectedzipcode !== '') send.zipcode = this.state.selectedzipcode;

        if (this.state.selectedcity && this.state.selectedcity !== '') send.city = this.state.selectedcity;

        console.log(send);

        this.props.loading();
        this.props.return(null);

        axios.post('/api/searchDistributors', send)
        .then(res => {
            if (res.data.error) {
                console.error(res.data.message);

                this.setState({
                    data: []
                }, () => {this.props.return(this.state.data)})
            }

            else {
                this.setState({
                    data: res.data.data.map(dist => {
                        return <DistributorSearchDisplay key={dist.dp.Id} data={dist}/>
                    })
                }, () => {this.props.return(this.state.data)})
            }

            this.props.loading();
        })
    }

    render() {
        return (
            <div className="DistributorSearch Search">
                <h2>Αναζήτηση Σημείων Διανομής</h2>
                <div className="Inputs">
                    <UltraComboDropdown  label="Όνομα Σημείου Διανομής"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.names} 
                                        onChange={this.hname} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Τηλέφωνο Σημείου Διανομής"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.phones} 
                                        onChange={this.hphone} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Οδός"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.streets} 
                                        onChange={this.hstreet} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Τ.Κ."      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.zipcodes} 
                                        onChange={this.hzipcode} 
                                        defaultValue=''/>

                    <UltraComboDropdown  label="Πόλη"      
                                        // placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                                        options={this.state.cities} 
                                        onChange={this.hcity} 
                                        defaultValue=''/>
                </div>

                <button className="SearchButton Distributor" onClick={this.Search}>
                        Αναζήτηση
                </button>
            </div>
        )
    }
}

function DistributorSearchDisplay(props) {
    const dist = props.data;

    return (
        <div className="TextbookPopupContent DistributorSearchDisplay SearchDisplay">
            <h3>{dist.dp.Name}</h3>

            <div className="line"/>

            <div className="AllContent">               
                <div onClick={() => {
                    var win = window.open(`https://www.google.com/maps/search/?api=1&query=
                    ${dist.a.Street_Name}+${dist.a.Street_Number}%2C+${dist.a.City}+${dist.a.ZipCode}`);
                    win.focus();
                }} className="Distributor Content" title='Ανοίξτε στο Google-Maps'>
                    <h4>Πληροφορίες</h4>
                    <p>{dist.dp.Phone}</p>
                    <p>{dist.a.Street_Name} {dist.a.Street_Number}, {dist.a.City} {dist.a.ZipCode}</p>
                    <p>{dist.dp.Working_Hours}</p>
                </div>
            </div>
            
        </div>
    )
}