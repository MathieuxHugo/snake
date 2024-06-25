import './Topbar.css';

import React from 'react';

class Topbar extends React.Component{

  constructor(props) {
    super(props)
    this.set4 = this.set4.bind(this)
    this.set6 = this.set6.bind(this)
    this.set8 = this.set8.bind(this)
  }
  set4(){
    this.props.setSize(4)
  }

  set6(){
    this.props.setSize(6)
  }

  set8(){
    this.props.setSize(8)
  }

  render(){
    return (
      <div class="topbar">
        <div class="dropdown">
        <h1 class="title">SNAKE</h1>
          <div class="dropdown-content" id="dropdownContent">
              <button onClick = {this.set4} class="projectMenu">4X</button>
              <button onClick = {this.set6} class="projectMenu">6X</button>
              <button onClick = {this.set8} class="projectMenu">8X</button>
          </div>
        </div> 
      </div>
    );  
  }
}

export default Topbar;
