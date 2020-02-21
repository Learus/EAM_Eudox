import React, { Component } from 'react';
import '../../css/Publisher/PublisherPublish.css';
import { Link, browserHistory } from "react-router";
import autobind from 'react-autobind';
import axios from 'axios';
import moment from 'moment';

import LoginPopup from '../Login';
import FormTextInput from '../Utilities';
import {UltraComboDropdown, ComboDropdown} from '../Utilities';

export default class PublisherPublish extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: null,
            publisherName: "",
            title: "",
            writer: "",
            isbn: "",
            date: "",
            publisher: "",
            publicationNumber: null,
            price: null,
            keywords: [],
            newKeywords: [],
            distPoints: [],
            chosenDistPoint: null,
            titleError: "",
            writerError: "",
            isbnError: "",
            dateError: "",
            publisherError: "",
            issueError: "",
            priceError: ""
        };

        autobind(this);
    }

    componentDidMount() {

        const user = this.getUser();
        // sessionStorage.removeItem("PendingTextbookPublication")
        let publication = sessionStorage.getItem("PendingTextbookPublication");
        if (publication) {
            publication = JSON.parse(publication);
            this.setState({
                title: publication.title,
                writer: publication.writer,
                isbn: publication.isbn,
                date: publication.date,
                publicationNumber: publication.publicationNumber,
                price: publication.price,
                newKeywords: publication.newKeywords,
                chosenDistPoint: publication.chosenDistPoint,
                user: user
            }, () => this.hSubmit());
        }
        else {
            this.setState({user: user})
        }

        this.getKeywords();
        this.getDistributionPoints();
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.login !== this.props.login) {
            this.setState({
                user: this.getUser()
            })
            return true;
        }

        return true;
    }

    getUser() {
        const user = JSON.parse(sessionStorage.getItem('EudoxusUser'));
        return user;
    }

    loginHandler() {
        this.props.loginHandler();
        this.hSubmit();
    }

    getKeywords() {
        axios.get('/api/getKeywords')
        .then(res => {
            if (res.data.error) {
                console.error(res.message);
            }
            else {
                this.setState({
                    keywords: res.data.data.map(element => {return {value: element.Id.toString(), label: element.Name} })
                });
            }
        })
    }

    getDistributionPoints() {
        axios.get('/api/getDistributors')
        .then(res => {
            if (res.data.error) {
                console.error(res.message);
            }
            else {
                let newState = this.state;
                
                newState.distPoints= res.data.data.map(element => {return {value: element.Id, label: element.Name} } );
                
                newState.distPoints.unshift( {value: null, label: " "} );

                this.setState(newState);
            }
            
        })
    }

    hTitleChange(event) {
        this.setState( {title: event.target.value} );
    }

    hWriterChange(event) {
        this.setState( {writer: event.target.value} );
    }

    hIsbnChange(event) {
        this.setState( {isbn: event.target.value} );
    }

    hDateChange(event) {
        this.setState( {date: event.target.value} );
    }

    hPublicationNumberChange(event) {
        this.setState( {publicationNumber: event.target.value} );
    }

    hPriceChange(event) {
        this.setState( {price: event.target.value} );
    }

    hKeywordChange(event) {
        this.setState( {newKeywords: event.map( keyword => {return keyword.value;})} );
    }

    hDistPointChange(event) {
        this.setState( {chosenDistPoint: event.value}, () => console.log(this.state) );
    }

    saveData() {
        console.log("savedata");
        const toSave = {
            title: this.state.title,
            writer: this.state.writer,
            isbn: this.state.isbn,
            date: this.state.date,
            publicationNumber: this.state.publicationNumber,
            price: this.state.price,
            newKeywords: this.state.newKeywords, 
            chosenDistPoint: this.state.chosenDistPoint
        }
        sessionStorage.setItem("PendingTextbookPublication", JSON.stringify(toSave))
    }

    hSubmit() {

        const user = this.state.user ? this.state.user : this.getUser();
        if (user && (user.Type !== "Publisher" && user.Type !== "PublDist")) {
            alert("Δεν δικαιούστε να κάνετε δήλωση. Παρακαλώ συνδεθείτε σε έναν εκδοτικό λογαριασμό")
            return;
        }

        let shouldPost = true; 
        
        // Title

        if(this.state.title === "")
        {
            this.setState({ titleError: "Αυτό το πεδίο είναι υποχρεωτικό" });
            shouldPost = false;
        }
        else
            this.setState({titleError: ""});

        // Writer
        
        if(this.state.writer === "")
        {
            this.setState({ writerError: "Αυτό το πεδίο είναι υποχρεωτικό" });
            shouldPost = false;
        }
        else
            this.setState({writerError: ""});

        // ISBN

        if(this.state.isbn.length !== 10)
        {
            this.setState({ isbnError: "Ο κωδικός Isbn είναι δεκαψήφιος" });
            shouldPost = false;
        }
        else
            this.setState({isbnError: ""});

        // Date
        console.log(`${moment(Date(this.state.date)).format("YYYY-MM-DD")} ${moment(Date.now()).format("YYYY-MM-DD")}`)
        if(this.state.date === null)
        {
            this.setState({ dateError: "Αυτό το πεδίο είναι υποχρεωτικό" });
            shouldPost = false;
        }
        else if(moment(Date(this.state.date)).format("YYYY-MM-DD") > moment(Date.now()).format("YYYY-MM-DD"))
        {
            this.setState({ dateError: "Δεν γίνεται να βάλετε μελλοντική ημερομηνία στο πεδίο \"Hμερομηνία έκδοσης\"" });
            shouldPost = false;
        }
        else
            this.setState({dateError: ""});
        
        // Publisher

        // Price
        
        if(this.state.price === null)
        {
            this.setState({ priceError: "Αυτό το πεδίο είναι υποχρεωτικό" });
            shouldPost = false;
        }
        else
            this.setState( {priceError: ""} );

        // Issue

        if(this.state.publicationNumber === null)
        {
            this.setState({ issueError: "Αυτό το πεδίο είναι υποχρεωτικό" });
            shouldPost = false;
        }
        else
            this.setState( {issueError: ""} );
        

        if(!shouldPost) return;

        let sqlDate = moment(this.state.date.value).format("YYYY-MM-DD HH:mm:ss");

        axios.post('/api/publishTextbook', {
            title: this.state.title,
            writer: this.state.writer,
            isbn: this.state.isbn,
            date: sqlDate,
            publisher_username: this.state.user.Username,
            publicationNumber: this.state.publicationNumber,
            price: this.state.price,
            keywords: this.state.newKeywords,
            distPoint: this.state.chosenDistPoint
        }).then(
            res => {
                if (res.data.error)
                {
                    alert(res.data.message);
                    this.setState({isbnError: res.data.message})
                }
                else
                {
                    alert(`Η καταχώριση του "${this.state.title}" ήταν επιτυχής`);
                    sessionStorage.removeItem("PendingTextbookPublication");
                    browserHistory.push("/actionpage/Publisher/2");
                    this.setState({isbnError: ""});
                }
            });
    }

    render() {

        const buttonContent = this.state.user ? 
            <button className="PublishButton" onClick={this.hSubmit}>
                Υποβολή
            </button> 
            : 
            <LoginPopup signupRedirect={'PublisherTextbookPublish'} 
                        className="PublishButton"
                        loginHandler={this.loginHandler} 
                        content="Υποβολή"
                        saveData={this.saveData}/>

        return (
            <div className="PublisherPublish">
                <h1>Καταχώριση Συγγραμμάτων</h1>
                <div className="line" />

                <div className="PublisherPublishForms">
                    <div className="PublisherPublishForm">

                        <FormTextInput
                            title={this.state.titleError}
                            className={this.state.titleError ? "Publisher wrong" : "Publisher"}
                            type="text"
                            label='Τίτλος Συγγράμματος *'
                            placeholder="π.χ. Ίντριγκα στο Βατικανό"
                            onChange={this.hTitleChange}
                            value={this.state.title}/>

                        <FormTextInput
                            title={this.state.writerError}
                            className={this.state.writerError ? "Publisher wrong" : "Publisher"}
                            type="text"
                            label='Συγγραφέας/είς *'
                            placeholder="π.χ. Ροδρίγος Βοργίας"
                            onChange={this.hWriterChange}
                            value={this.state.writer}/>

                        <FormTextInput
                            title={this.state.isbnError}
                            className={this.state.isbnError ? "Publisher wrong" : "Publisher"}
                            type="text"
                            label='ISBN *'
                            placeholder="π.χ. 9783161484"
                            onChange={this.hIsbnChange}/>


                        <div className="TriplePublisherInputs">
                            <FormTextInput
                                title={this.state.dateError}
                                className={this.state.dateError ? "Publisher wrong" : "Publisher"}
                                type="date"
                                label='Ημερομηνία έκδοσης *'
                                placeholder="π.χ. 23/1/1997"
                                onChange={this.hDateChange}
                                value={this.state.date}/>

                            <FormTextInput
                                title={this.state.issueError}
                                className={this.state.issueError ? "Publisher wrong" : "Publisher"}
                                type="number"
                                label='Αριθμός Έκδοσης *'
                                placeholder="π.χ. 3"
                                onChange={this.hPublicationNumberChange}
                                value={this.state.publicationNumber}/>

                            <FormTextInput
                                title={this.state.priceError}
                                className={this.state.priceError ? "Publisher wrong" : "Publisher"}
                                type="number"
                                label='Τιμή *'
                                placeholder="π.χ. 30"
                                onChange={this.hPriceChange}
                                value={this.state.price}/>
                        </div>

                        </div>

                        <div className="PublisherPublishForm Right">
                            <UltraComboDropdown  label="Λέξεις Κλειδιά"      
                                // placeholder="Μηχανική, Φρόυντ, Γλώσσα"
                                options={this.state.keywords} 
                                onChange={this.hKeywordChange} 
                                isMulti={true}
                                defaultValue={this.state.keywords}/>

                            <ComboDropdown  label="Σημείο Διανομής"      
                                options={this.state.distPoints} 
                                onChange={this.hDistPointChange} 
                                defaultValue={this.state.chosenDistPoint}/>
                        </div>
                </div>

                {buttonContent}
                {/* <button className="PublishButton" onClick={this.hSubmit}>Υποβολή</button> */}
            </div>
        );
    }
}