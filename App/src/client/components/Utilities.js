import React, { Component } from 'react';

export default function FormTextInput(props)  {
    return(
        <label>
            <p className={props.labelClass}>{props.label}</p>
            <input 
                title = {props.title}
                className = {props.className}
                type = {props.type} 
                placeholder={props.placeholder}
                onChange = {props.onChange}
                value = {props.value}
            />
        </label>
    );
}