import React, {Component} from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import "../css/Search.css";
import {Dropdown} from "./Student/ApplicationManager"

import FormTextInput from './Utilities'
import Header from './Header'

export default class Search extends Component {
    constructor(props) {
        super (props);

        this.state = {
            active: "textbook",
            data: null
        }

        autoBind(this);
    }

    retrieveData(data) {
        this.setState({
            data: data
        })
    }

    SearchCategoryButton(props) {
        return (
            <button className={this.state.active === props.active ? "SearchCategoryButton Active" : "SearchCategoryButton"} 
                    onClick={ () => {this.setState({active: props.active})}}>
                {props.label}
            </button>
        )
    }

    render() {
        let actionList = null;
        switch(this.state.active) {
            case "textbook" : 
                actionList = <TextbookSearch return={this.retrieveData}/>;
                break;
            case "textbook" : 
                actionList = <PublisherSearch return={this.retrieveData}/>;
                break;
            case "textbook" : 
                actionList = <DistributorSearch return={this.retrieveData}/>;
                break;

        }

        return (
            <div className="SearchPage">
                <Header/>
                <div className="SideBar">

                    <div className="SearchCategoryButtons">
                        <this.SearchCategoryButton active="textbook" label="Σύγραμματα"/>
                        <this.SearchCategoryButton active="publisher" label="Εκδότες"/>
                        <this.SearchCategoryButton active="distributor" label="Σημεία Διανομής"/>
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
            universities: []
        }
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
    }

    getDepartments(event) {

    }

    hName(event) {
        this.setState({name: event.target.value});
    }

    render() {
        return (
            <div className="Inputs">
               <FormTextInput 
                    type = "text" 
                    label = 'Όνομα Συγγράμματος'
                    placeholder="Η Μηχανική και Εγώ, C++"
                    onChange = {this.hName}/>
                <FormTextInput 
                    type = "text" 
                    label = 'Συγγραφέας'
                    placeholder="Ιωάννης Ιωάννου, Δρακονταειδής, Τριβιζ"
                    onChange = {this.hName}/>
                <FormTextInput 
                    type = "text" 
                    label = 'ISBN'
                    placeholder="1234567890123, 6547"
                    onChange = {this.hName}/>
                <FormTextInput 
                    type = "text" 
                    label = 'Εκδότης'
                    placeholder="Εκδόσεις Κνωσσός, Κνωσσός"
                    onChange = {this.hName}/>
                <FormTextInput 
                    type = "text" 
                    label = 'Σημείο Διανομής'
                    placeholder="Κνωσσός, Βιβλιοπωλείο Ο Λάμπρος"
                    onChange = {this.hName}/>

                <Dropdown label="Πανεπιστήμιο" onChange={this.getDepartments} data={this.state.universities}/>
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
            <div>
                
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
            <div>
                
            </div>
        )
    }
}