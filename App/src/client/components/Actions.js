import Header from "./Header";
import React from "react";
import { StudentApplications, StudentHelp } from "./StudentActions";
import { PublisherPublish, PublisherHelp } from "./PublisherActions";

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
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
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
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
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
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
        ],
        Type: "Distributor"
    }
}