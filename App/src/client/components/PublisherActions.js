import React, {Component} from 'react';
import '../css/PublisherActions.css';
import axios from 'axios';

export {
    PublisherPublish
}

function PublisherPublish(props) {
    return(
        <div className="PublisherPublish">
            <h1>Καταχώρηση Συγγραμμάτων</h1>
            <div className="line"/>
            <div className="PublisherPublishForm">

                <FormTextInput
                    title="Tίτλος Συγγράματος"
                    className="Publisher"
                    type = "text" 
                    label = 'Τίτλος Συγγράμματος *'
                    placeholder="π.χ. 978-3-16-148410-0"/>

                <FormTextInput
                    title="Συγγραφέας/είς"
                    className="Publisher"
                    type = "text" 
                    label = 'Συγγραφέας/είς *'
                    placeholder="π.χ. Ναπολέων Μαραβέγιας"/>

                <FormTextInput
                    title="ISBN"
                    className="Publisher"
                    type = "text" 
                    label = 'ISBN *'
                    placeholder="π.χ. 978-3-16-148410-0"/>

                <FormTextInput
                    title="Εκδότης"
                    className="Publisher"
                    type = "text" 
                    label = 'Εκδότης *'
                    placeholder="π.χ. Εκδόσεις Ζαρατούστρα"/>
                
                <FormTextInput
                    title="Έτος έκδοσης"
                    className="Publisher"
                    type = "number" 
                    label = 'Έτος έκδοσης *'
                    placeholder="π.χ. 1997"/>

                <FormTextInput
                    title="Έτος έκδοσης"
                    className="Publisher"
                    type = "number" 
                    label = 'Έτος έκδοσης *'
                    placeholder="π.χ. 1997"/>

                <FormTextInput
                    title="Έτος έκδοσης"
                    className="Publisher"
                    type = "number" 
                    label = 'Έτος έκδοσης *'
                    placeholder="π.χ. 1997"/>

            </div>
        </div>
    );
}

function FormTextInput(props)  {
    return(
        <label>
            <p>{props.label}</p>
            <input 
                title = {props.title}
                className = {props.className}
                type = {props.type} 
                placeholder={props.placeholder}
                onChange = {props.onChange}
            />
        </label>
    );
}