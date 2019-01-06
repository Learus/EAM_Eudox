import Header from "./Header";
import React from "react";

import StudentApplications from "./Student/ApplicationPresenter";
import StudentHelp from "./Student/StudentHelp"

import PublisherPublish from "./Publisher/PublisherPublish";
import PublisherHelp from "./Publisher/PublisherHelp";

import { NotFoundSmall } from "./NotFound";


export default {
    Student: {
        Header: "Φοιτητές",
        Actions: [
            "Δήλωση Συγγραμμάτων",
            "Προβολή Δηλώσεων",
            "Οδηγίες - Βοήθεια"
        ],
        Quicks: [0, 1],
        Default: 3,
        Components: [
            () => {return <h1>Test0</h1>},
            () => {return <StudentApplications/>},
            () => {return <StudentHelp/>},
        ],
        Type: "Student"
    },
    Secretary: {
        Header: "Γραμματείες",
        Actions: [
            "Καταχώριση Μαθημάτων",
            "Αντιστοίχιση Συγραμμάτων",
            "Οδηγίες - Βοήθεια"
        ],
        Quicks: [0, 1],
        Default: 2,
        Components: [
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
        ],
        Type: "Secretary"
    },
    Publisher: {
        Header: "Εκδότες",
        Actions: [
            "Καταχώριση Συγγραμμάτων",
            "Επιλογή Σημείων Διανομής",
            "Προβολή Περασμένων Συγραμμάτων",
            "Προβολή Αιτήσεων",
            "Οδηγίες - Βοήθεια"
        ],
        Quicks: [0],
        Default: 4,
        Components: [
            () => {return <PublisherPublish/>},
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
            () => {return <PublisherHelp/>},
        ],
        Type: "Publisher"
    },
    Distributor: {
        Header: "Διανομείς",
        Actions: [
            "Παράδοση Συγγραμμάτων",
            "Προβολή Συγγραμμάτων",
            "Προβολή Αιτήσεων",
            "Οδηγίες Βοήθεια"
        ],
        Quicks: [0],
        Default: 3,
        Components: [
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
            () => {return <NotFoundSmall/>},
        ],
        Type: "Distributor"
    }
}