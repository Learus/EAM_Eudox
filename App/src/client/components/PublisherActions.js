import React, { Component } from 'react';
import '../css/PublisherActions.css';
import { Link, browserHistory } from "react-router";
import axios from 'axios';

export {
    PublisherPublish,
    PublisherHelp
}

function PublisherPublish(props) {
    return (
        <div className="PublisherPublish">
            <h1>Καταχώρηση Συγγραμμάτων</h1>
            <div className="line" />
            <div className="PublisherPublishForm">

                <FormTextInput
                    title="Tίτλος Συγγράματος"
                    className="Publisher"
                    type="text"
                    label='Τίτλος Συγγράμματος *'
                    placeholder="π.χ. 978-3-16-148410-0" />

                <FormTextInput
                    title="Συγγραφέας/είς"
                    className="Publisher"
                    type="text"
                    label='Συγγραφέας/είς *'
                    placeholder="π.χ. Ναπολέων Μαραβέγιας" />

                <FormTextInput
                    title="ISBN"
                    className="Publisher"
                    type="text"
                    label='ISBN *'
                    placeholder="π.χ. 978-3-16-148410-0" />

                <FormTextInput
                    title="Εκδότης"
                    className="Publisher"
                    type="text"
                    label='Εκδότης *'
                    placeholder="π.χ. Εκδόσεις Ζαρατούστρα" />

                <FormTextInput
                    title="Έτος έκδοσης"
                    className="Publisher"
                    type="number"
                    label='Έτος έκδοσης *'
                    placeholder="π.χ. 1997" />

                <FormTextInput
                    title="Έτος έκδοσης"
                    className="Publisher"
                    type="number"
                    label='Έτος έκδοσης *'
                    placeholder="π.χ. 1997" />

                <FormTextInput
                    title="Έτος έκδοσης"
                    className="Publisher"
                    type="number"
                    label='Έτος έκδοσης *'
                    placeholder="π.χ. 1997" />

            </div>
        </div>
    );
}

function PublisherHelp(props) {
    return (
        <div className="PublisherHelp">
            <h1>Οδηγίες - Βοήθεια</h1>
            <div className="line" />

            <ul>
                <li>
                    Ως Εκδότης μπορείτε να <Link to='/actionpage/Publisher/0' id="Link">καταχωρήσετε</Link> τα συγγράμματά σας στον Εύδοξο για να τα θέσετε διαθέσιμα προς διανομή.<br/>
                </li>

                <li>
                    Για ήδη καταχωρημένα συγγράμματα μπορείτε να <Link to='/actionpage/Publisher/1' id="Link">επιλέξετε</Link> με ποιούς διανομείς (Βιβλιοθήκες, καθηγητές, κ.α.) να συνεργαστείτε. Ακόμη, υπάρχει δυνατότητα να δράσετε εσείς ως διανομέας.<br/>
                </li>

                <li>
                    Εάν έχετε λογαριασμό, μπορείτε να προβάλλετε τα <Link to='/actionpage/Publisher/2' id='Link'>συγγράμματα</Link> που έχετε καταχωρήσει, καθώς και την κατάσταση <Link to='/actionpage/Publisher/3' id='Link'>αιτήσεων</Link> συνεργασίας με διανομείς.<br/>
                </li>
            </ul>

        </div>
    );
}

function FormTextInput(props) {
    return (
        <label>
            <p>{props.label}</p>
            <input
                title={props.title}
                className={props.className}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </label>
    );
}