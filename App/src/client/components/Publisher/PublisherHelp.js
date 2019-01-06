import React, { Component } from 'react';
import '../css/PublisherActions.css';
import { Link, browserHistory } from "react-router";
import axios from 'axios';

export default function PublisherHelp(props) {
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

