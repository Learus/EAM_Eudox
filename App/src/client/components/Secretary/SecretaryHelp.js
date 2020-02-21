import React, { Component } from 'react';
import '../../css/Secretary/SecretaryHelp.css';
import { Link, browserHistory } from "react-router";
import axios from 'axios';

export default function SecretaryHelp(props) {
    return (
        <div className="SecretaryHelp">
            <h1>Οδηγίες - Βοήθεια</h1>
            <div className="line" />

            <ul>
                <li>
                    Ως γραμματεία ενός πανεπιστημιακού τμήματος μπορείτε να <Link to='/actionpage/Secretary/0' id="Link">καταχωρήσετε</Link> τα μαθήματα του προγράμματος σπουδών του τμήματος στο οποίο ανήκετε. <br/>
                </li>

                <li>
                    Μπορείτε να <Link to='/actionpage/Secretary/1' id="Link">αντιστοιχίσετε</Link> κάθε καταχωρημένο απο εσάς μάθημα, με τα προτεινόμενα συγγράμματά του.<br/>
                </li>

                <li>
                    Υπάρχει δυνατότητα <Link to='/actionpage/Secretary/2' id='Link'>προβολής</Link> των ήδη καταχωρημένων μαθημάτων του προγράμματος σπουδών.<br/>
                </li>
            </ul>

        </div>
    );
}

