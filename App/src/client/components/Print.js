import React, {Component} from 'react'
import {TextbookSearchDisplay} from './Search';
import html2canvas from 'html2canvas';
import autoBind from 'react-autobind';
import {browserHistory} from 'react-router'
import jsPDF from 'jspdf'

export default class Printer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        autoBind(this);
    }

    componentDidMount() {
        const data = JSON.parse(sessionStorage.getItem("EudoxusPrintApplication"))

        if (data)
            this.setState({
                data: data.map( tb => {
                    return <TextbookSearchDisplay key={tb.t.Id} data={tb}/>
                })
            })
    }

    componentDidUpdate() {
        this.print();
    }

    print() {
        const input = document.getElementById("Print");

        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, 220, 220);
            pdf.save("Δήλωση.pdf");

            browserHistory.push('/actionpage/Student/1');
        })
    }

    render() {
        return (
            <div id = "Print">
                {this.state.data}
            </div>
        )
    }
}