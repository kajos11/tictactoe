import React from 'react';
import './App.css';
import Game from './Game'
import Peer from 'peerjs'
import { func } from 'prop-types';

class App extends React.Component{
  
  constructor(props){
    super(props)
    // const clientId = this.randomStr(20, '12345abcde')
    // const peer = new Peer(clientId);
    this.state={
      inputValue: '',
      //clientId:clientId,
      //peer:peer,
      isConnected:false,
      //conn:null
    }
    // this.onSubmit = this.onSubmit.bind(this);
    // this.updateInputValue = this.updateInputValue.bind(this);
    // peer.on('connection', (conn) => {
    //   conn.on('data', (data) => {
    //     // Will print 'hi!'
    //     console.log(data);
    //     if(data == 'connection successfull'){
    //       debugger
    //       this.setState({isConnected:true,conn:conn})
    //     }
    //   });
    // });
  }
  // onSubmit(e) {
  //   e.preventDefault();
  //   alert(this.state.inputValue);
  //   const conn = this.state.peer.connect(this.state.inputValue);
  //   conn.on('open', () => {
  //      this.setState({conn:conn,isConnected:true})
  //      conn.send('connection successfull');
  //    });
  // }
  // randomStr(len, arr) { 
  //   var ans = ''; 
  //   for (var i = len; i > 0; i--) { 
  //       ans +=  
  //         arr[Math.floor(Math.random() * arr.length)]; 
  //   } 
  //   return ans; 
  
  // }

  // updateInputValue(event) {
  //   this.setState({inputValue:event.target.value})
  // }

  render(){
    // const isConnected  = this.state.isConnected;
    // let connectionDetails = null;
    // if(!isConnected){
    //   connectionDetails = <div>
    //   Client ID: {this.state.clientId}<br/>
    //   Enter Client ID to start game: <input  
    //   type="text" onChange={this.updateInputValue}/>
    //   <button onClick={this.onSubmit}>Start</button>
    //   </div>
    // }
    // else{
    //   connectionDetails = <b>Connected</b>
    // }
    return (
      

      <div className="App">
        <Game /><br/>
        {/* {connectionDetails} */}
        
      </div>
    );
  }


}


// function App() {
//   const clientId = randomStr(20, '12345abcde')
//   const peer = new Peer(clientId); 
//   function updateInputValue(){
    
//   }
//   return (
//     <div className="App">
//       <Game /><br/>
//       Client ID: {clientId}<br/>
//       Enter Client ID to start game: <input type="text" name="server"/>
//       <button onClick={}>Start</button>
//     </div>
//   );
// }

export default App;
