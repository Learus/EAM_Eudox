import React, { Component } from 'react';
import '../css/app.css';

export default class App extends Component {

  render() {
    return (
      <div>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}
