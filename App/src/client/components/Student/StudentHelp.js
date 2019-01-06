import React, {Component} from 'react';
import { Link } from "react-router";

import '../../css/Student/StudentHelp.css';

export default function StudentHelp(props) {
    return(
        <div className="StudentHelp">
            <h1>Οδηγίες - Βοήθεια</h1>
            <div className="line"/>

            <ul>
                <li>
                    Ως Φοιτητής δικαιούστε ένα σύγγραμμα ανά μάθημα που παρακολουθείτε.<br/>
                    <Link to='/actionpage/Student/0' id="Link">Ξεκινήστε τη δήλωσή σας</Link> 
                </li>

                <li>
                    Εάν έχετε λογαριασμό, μπορείτε να <Link to='/actionpage/Student/1' id='Link'>προβάλλετε</Link> τις προηγούμενες, καθώς και την τρέχουσα, δηλώσεις σας.
                </li>
            </ul>

        </div>
    );
}
