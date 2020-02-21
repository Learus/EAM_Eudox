import React, { Component } from 'react';
import '../../css/Distributor/DistributorHelp.css';
import { Link, browserHistory } from "react-router";
import axios from 'axios';

export default function DistributorHelp(props) {
    return (
        <div className="DistributorHelp">
            <h1>Οδηγίες - Βοήθεια</h1>
            <div className="line" />

            <ul>
                <li>
                    Ως Διανομέας, δέχεστε <Link to='/actionpage/Distributor/2' id="Link">αιτήσεις</Link> από εκδότες για να διανέμετε τα συγγράμματά τους. <br/>
                </li>

                <li>
                    Μπορείτε να <Link to='/actionpage/Distributor/1' id="Link">προβάλετε</Link> τα συγγράμματά που έχετε διαθέσιμα στο απόθεμά σας.<br/>
                </li>

                <li>
                    Φοιτητές θα έρχονται για παραλάβουν συγγράμματα με τους κατάλληλους κωδικούς. <br/> Μέσω της <Link to='/actionpage/Distributor/2' id='Link'>Παράδοσης Συγγραμμάτων</Link> εξακριβώνετε τους κωδικούς αυτούς.<br/>
                </li>
            </ul>

        </div>
    );
}

