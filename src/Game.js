import React from 'react';
import Board from './Board'
import Peer from 'peerjs'
import './Game.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Game extends React.Component {

  constructor(props) {
    super(props)
    const clientId = this.randomStr(20, '12345abcde')
    const peer = new Peer(clientId);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      clientId: clientId,
      stepNumber: 0,
      peer: peer,
      conn: null,
      currentChance:false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.reset= this.reset.bind(this);

    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
        debugger
        if (data.status == 'connection successfull') {
          debugger
          const conns = this.state.peer.connect(data.clientId)
          conns.on('open', () => {
            this.setState({ conn: conns, isConnected: true })
          })
        }
        else if(data.status == 'reset'){
          this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
          })
        }
        else {
          debugger
          this.setState({ squares: data.squares, xIsNext: data.xIsNext, currentChance: true })
          toast('🦄 Your Turn!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
        }
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const conn = this.state.peer.connect(this.state.inputValue);
    this.setState({currentChance: true})
    toast('🦄 Your Turn!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
    conn.on('open', () => {
      this.setState({ conn: conn, isConnected: true })
      conn.send({ status: 'connection successfull', clientId: this.state.clientId });
    });
  }
  randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
      ans +=
        arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;

  }
  updateInputValue(event) {
    this.setState({ inputValue: event.target.value })
  }

  handleClick(i) {
    debugger
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext,currentChance:false })
    this.state.conn.send({ squares: squares, xIsNext: !this.state.xIsNext })
  }

  reset(){
    this.setState({squares:Array(9).fill(null),xIsNext: true})
    this.state.conn.send({ status: 'reset' })
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    var playAgainButton = ''
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      playAgainButton = <div class="resetButton"><button onClick={this.reset}>Play Again</button></div>
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    const isConnected = this.state.isConnected;
    let connectionDetails = null;
    if (!isConnected) {
      connectionDetails =
        <div class="connectionDiv">
          <span class="headingFont">Your ID: <span id="clientId"><b><i>{this.state.clientId}</i></b></span></span><br />
          <div>
            <span class="headingFont">Enter friends ID to start game: </span> 
            <input class="inputField"
              type="text" onChange={this.updateInputValue} />
            <button class="submitBtn" name="submitBtn" onClick={this.onSubmit}>JOIN</button>
          </div>
        </div>
    }
    else {
      connectionDetails =
        <div>
          <b>Connected</b>
          {playAgainButton}
          <div className="game">
            <div className="game-board">
              <Board squares={this.state.squares} status={status}
                onClick={(i) => this.handleClick(i)} currentChance={this.state.currentChance} />
            </div>
          </div>
        </div>
    }


    return (
      <div>
        <h1>TicTacToe Multiplayer</h1>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {connectionDetails}
      </div>

    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      toast('🎉🎉🎉🎉🎉 WINNER is '+squares[a]+'🎉🎉🎉🎉🎉', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
      return squares[a];
    }
  }
  return null;
}



export default Game;