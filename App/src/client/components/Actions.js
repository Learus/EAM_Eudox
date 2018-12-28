import Header from "./Header";
import React from "react";

export default {
    Student: {
        Header: "Φοιτητές",
        Actions: [
            "Δήλωση Συγγραμμάτων",
            "Ανταλλαγή Συγγραμμάτων",
            "Προβολή Δηλώσεων",
            "Οδηγίες - Βοήθεια"
        ],
        Quicks: [0, 1],
        Components: [
            () => {return <Header/>},
            () => {return <Header/>}
        ]
    },
    Secretary: {
        Header: "Γραμματείες",
        Actions: [
            "Καταχώριση Μαθημάτων",
            "Αντιστοίχιση Συγραμμάτων",
            "Οδηγίες - Βοήθεια"
        ],
        Quicks: [0, 1],
        Components: []
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
        Components: []
    },
    Distributor: {
        Header: "Διανομείς",
        Actions: [
            "Παράδοση Συγγραμμάτων",
            "Προβολή Συγγραμμάτων",
            "Προβολή Αιτήσεων"
        ],
        Quicks: [0],
        Components: []
    }
}