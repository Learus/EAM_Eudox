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
                    Ως Φοιτητής δικαιούστε ένα σύγγραμμα ανά μάθημα που παρακολουθείτε στο εκάστοτε εξάμηνο.<br/>
                    Μέχρις ότου η προθεσμία δήλωσης να λήξει, έχετε το δικαίωμα να <Link to='/actionpage/Student/1' id="Link">τροποποιήσετε</Link> την τρέχουσα δήλωσή σας,<br/>
                    δεδομένου ότι δεν έχετε παραλάβει το σύγγραμα,
                    το οποίο τροποποιείτε. <br/>
                    Μετά τη λήξη της προθεσμίας, καμία δήλωση δεν αλλάζει.<br/>
                    <Link to='/actionpage/Student/0' id="Link">Ξεκινήστε τη δήλωσή σας.</Link> 
                </li>

                <li>
                    Εάν έχετε λογαριασμό, μπορείτε να <Link to='/actionpage/Student/1' id='Link'>προβάλλετε</Link> την τρέχουσα, καθώς και τις προηγούμενες δηλώσεις σας.
                </li>
            </ul>

        </div>
    );
}
