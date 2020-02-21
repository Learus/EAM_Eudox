import React, {Component} from 'react'
import Announcements from './Announcements'
// import {AnnouncementTable} from './Home'
import Header from './Header'
import "../css/AnnouncementPage.css"
import Popup from 'reactjs-popup'

export default class AnnouncementPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="AnnouncementPage">
                <Header />
                <h1>Ανακοινώσεις</h1>
                <AnnouncementTable />
            </div>
        )
    }
}

function AnnouncementTable() {

    const announcements = Announcements.map((a, index) => {
        const even = index % 2 === 0 ? "Even" : "Odd"
        if (a.content !== '')
            return (
                <Popup className='AnnouncementPopup' key={index} modal position="left center" trigger=
                {
                    <div className={`Announcement ${even}`} >
                        <h3>{a.title}</h3>
                        <p>{a.type}</p>
                    </div>
                }>
                    <div>
                        <h3>{a.title}</h3>
                        <span>{a.type}</span>
                        <p>{a.content}</p>
                    </div>
                        
                </Popup>
                
            );
        else 
            return (
                <div className={`Announcement ${even}`} >
                    <h3>{a.title}</h3>
                    <p>{a.type}</p>
                </div>
            );
    })

    return (
        <div className="AnnouncementTable">

            <div className="Announcements">
                {announcements}
            </div>
            
        </div>
    )
}