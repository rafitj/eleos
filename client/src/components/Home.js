import React, { Component } from 'react';
import '../assets/css/home.css';
import logo from '../assets/help_logo.svg'
class Home extends Component {
  render() {
    return (
        <div className = "home_container">
            <img className = "home_logo" alt = "logo" src = {logo} />
            <br />
            <input className= "home_search" type = "text"></input>
        </div>
    );
  }
}
export default Home;