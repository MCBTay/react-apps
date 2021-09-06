import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        key={i}
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  render() {
    const numRows = 3, numCols = 3;

    return (
      <div>
        {
          [...new Array(numRows)].map((x, rowIndex) => {
            return (
              <div className="board-row" key={rowIndex}>
                {[...new Array(numCols)].map((y, colIndex) => this.renderSquare(rowIndex * numRows + colIndex))}
              </div>
            )
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: Array(2).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      sortDesc: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    let rowPosition = Math.floor(i / 3);
    let colPosition = i % 3;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        position: [rowPosition + 1, colPosition + 1]
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  toggleSort() {
    this.setState({
      sortDesc: !this.state.sortDesc
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc = move 
        ? 'Go to move #' + move + ' (' + step.position[0] + ', ' + step.position[1] + ')' 
        : 'Go to game start';

      if (move === this.state.stepNumber) {
        desc = <b>{desc}</b>;
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let sortButtonText = 'Sort ' + (this.state.sortDesc ? 'Desc' : 'Asc');

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} 
          />
        </div>
        <div className="game-info">          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}>
            <div>{status}</div>
            
          </div>
          <div
            style={{
              margin: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}><button onClick={() => this.toggleSort()}>{sortButtonText}</button></div>
          <ol>{moves}</ol>
        </div>
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
      return squares[a];
    }
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

