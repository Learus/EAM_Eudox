import Header from "./Header";
import React from "react";
import ApplicationManager from "./Student/ApplicationManager";
import { StudentApplications } from "./StudentActions";
import { PublisherPublish } from "./PublisherActions";

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
            () => {return <ApplicationManager/>},
            () => {return <StudentApplications/>},
            () => {return <h1>Test2</h1>},
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
            (state) => {return <PublisherPublish username = {state.user}/>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
            () => {return <h1>Test0</h1>},
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