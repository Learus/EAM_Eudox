import React, { Component } from 'react';
import '../../css/Publisher/PublisherPublish.css';
import { Link, browserHistory } from "react-router";
import axios from 'axios';

import FormTextInput from '../Utilities';

export default function PublisherPublish(props) {
    return (
        <div className="PublisherPublish">
            <h1>Καταχώριση Συγγραμμάτων</h1>
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