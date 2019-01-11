import React, { Component } from 'react';
import '../../css/Publisher/PublisherPublish.css';
import { Link, browserHistory } from "react-router";
import autobind from 'react-autobind';
import axios from 'axios';
import moment from 'moment';

import FormTextInput from '../Utilities';

export default class PublisherPublish extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: null,
            publisherName: "",
            title: "",
            writer: "",
            isbn: "",
            date: null,
            publisher: "",
            publicationNumber: null,
            price: null,
            keywords: "",
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
        this.setState( {
            user: JSON.parse(sessionStorage.getItem('EudoxusUser'))
        }, () => {
            if(this.state.user)
            {
                axios.post('/api/getPublisherDetails', {username: this.state.user.Username}).then( res => {
                    console.log(res.data.data);
                    this.setState( {publisherName: res.data.data.Name} );
                });
            }
        });
    }

    hSubmit() {

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

        if(this.state.date === null)
        {
            this.setState({ dateError: "Αυτό το πεδίο είναι υποχρεωτικό" });
            shouldPost = false;
        }
        else if(Date(this.state.date) > Date(Date.now()))
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
            keywords: this.state.keywords
        });
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
        this.setState( {keywords: event.target.value} );
    }

    render() {

        //console.log(this.state);

        return (
            <div className="PublisherPublish">
                <h1>Καταχώριση Συγγραμμάτων</h1>
                <div className="line" />
                <div className="PublisherPublishForm">

                    <FormTextInput
                        title={this.state.titleError}
                        className={this.state.titleError ? "Publisher wrong" : "Publisher"}
                        type="text"
                        label='Τίτλος Συγγράμματος *'
                        placeholder="π.χ. Ίντριγκα στο Βατικανό"
                        onChange={this.hTitleChange}/>

                    <FormTextInput
                        title={this.state.writerError}
                        className={this.state.writerError ? "Publisher wrong" : "Publisher"}
                        type="text"
                        label='Συγγραφέας/είς *'
                        placeholder="π.χ. Ροδρίγος Βοργίας"
                        onChange={this.hWriterChange}/>

                    <FormTextInput
                        title={this.state.isbnError}
                        className={this.state.isbnError ? "Publisher wrong" : "Publisher"}
                        type="text"
                        label='ISBN *'
                        placeholder="π.χ. 9783161484100"
                        onChange={this.hIsbnChange}/>

                    <FormTextInput
                        title={this.state.publisherError}
                        className={this.state.publisherError ? "Publisher wrong" : "Publisher"}
                        type="text"
                        label='Εκδότης *'
                        placeholder="π.χ. Εκδόσεις Λουκρετία"
                        /*onChange={}*/
                        value ={this.state.publisherName}
                        readonly={true}/>


                    <FormTextInput
                        title={this.state.dateError}
                        className={this.state.dateError ? "Publisher wrong" : "Publisher"}
                        type="date"
                        label='Ημερομηνία έκδοσης *'
                        placeholder="π.χ. 23/1/1997"
                        onChange={this.hDateChange}/>

                    <span>&nbsp;-&nbsp;</span>

                    <FormTextInput
                        title={this.state.issueError}
                        className={this.state.issueError ? "Publisher wrong" : "Publisher"}
                        type="number"
                        label='Αριθμός Έκδοσης *'
                        placeholder="π.χ. 3"
                        onChange={this.hPublicationNumberChange}/>

                    <span>&nbsp;-&nbsp;</span>

                    <FormTextInput
                        title={this.state.priceError}
                        className={this.state.priceError ? "Publisher wrong" : "Publisher"}
                        type="number"
                        label='Τιμή *'
                        placeholder="π.χ. 30"
                        onChange={this.hPriceChange}/>


                    <FormTextInput
                        title=""
                        className="Publisher"
                        type="text"
                        label='Λέξεις Κλειδιά'
                        placeholder="π.χ. Φυσική Ηλεκρομαγνητισμός Οπτική"
                        onChange={this.hKeywordChange}/>

                    <button onClick={this.hSubmit}>Υποβολή</button>

                </div>
            </div>
        );
    }
}