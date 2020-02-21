import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable'
import createFilterOptions from 'react-select-fast-filter-options';

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
                readOnly={props.readonly}
            />
        </label>
    );
}

export function SimpleDropdown(props) {

    let content;
    if (props.groupBy)
    {
        let groups = {};
        for (let i = 0; i < props.data.length; i++) {
            const element = props.data[i];
            
            if (!groups.hasOwnProperty(element[props.groupBy])) {
                groups[`${element[props.groupBy]}`] = [];
            }

            groups[`${element[props.groupBy]}`].push(element);
        }

        content = Object.keys(groups).map(key => {
            const group = groups[key];

            return (
                <optgroup key={key} label={key + props.groupLabel}>
                    {
                        group.map(element => {
                            // console.log(element);
                            return <option key = {element.Id} value = {element.Id}>{element.Name}</option>
                        })
                    }
                </optgroup>
            )
        })
    }
    else {
        content = props.data.map(element => {
            return (
                <option key = {element.Id} value = {element.Id}>{element.Name}</option>
            );
        });
    }

    return (
        <label className="SearchBar">
            <p>{props.label}</p>
            <select 
                type = "dropdown"
                onChange = {props.onChange}
                defaultValue={props.selected}
                >
                <option value = ''></option>
                {content}
            </select>
        </label>
    )
}

export function ComboDropdown(props) {
    return(
        <div className="SearchBar" title={props.title}>
            <p>{props.label}</p>
            <Select filterOptions={createFilterOptions(props.options)} 
                    options={props.options}
                    onChange={props.onChange} 
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder ? props.placeholder : "Επιλέξτε ή Γράψτε..."}
                    isMulti={props.isMulti}
                    className={"ComboDropdown " + props.className}
                    classNamePrefix="ComboDropdown"
                    value={props.value} />
        </div>
    )
}

export function UltraComboDropdown(props) {
    return(
        <div className="SearchBar" title={props.title}>
            <p>{props.label}</p>
            <CreatableSelect filterOptions={createFilterOptions(props.options)} 
                    options={props.options}
                    onChange={props.onChange} 
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder ? props.placeholder : "Επιλέξτε ή Γράψτε..."}
                    isMulti={props.isMulti}
                    className={"ComboDropdown " + props.className}
                    classNamePrefix="ComboDropdown"
                    value={props.value} />
        </div>
    )
}