import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd-mobile';
  

class App extends Component(){
  render(){
    const boss = 'LI';
    return (
      <div>
        <h2>AAAAA{boss}</h2>
        
      </div>
    )
  }
}











export default App;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }