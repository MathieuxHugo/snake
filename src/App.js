import './App.css';

import Board from './Board'
import React from 'react';
import Etats from './Etats';
import Topbar from './Topbar';


const Direction={
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right"
}

class App extends React.Component{
  constructor(){
    super()
    this.intervalTime=800
    this.setSize=this.setSize.bind(this)
    this.setSize(6)
  }

  setSize(size){
    this.size=size
    this.board=[]
    this.createBoard()
    this.state={gameOver: false, gameWon: false, board:this.board}
    this.snake={snakeHead: 1,snakeBody: [0]}
    this.apple=4*this.size+(this.size/2)
    this.direction=Direction.DOWN
    this.bufferDirection=Direction.DOWN
    this.placeSnake()
    this.placeApple()
    this.startInterval()
  }

  startInterval(){
    if(this.timerID==null){
      this.timerID = setInterval(()=>this.move(),this.intervalTime)
    }
  }

  stopInterval(){
    clearInterval(this.timerID);  
    this.timerID=null;
  }

  placeSnake(){
    this.changeSquare(this.snake.snakeHead,Etats.HEAD)
    for(let s of this.snake.snakeBody){
      this.changeSquare(s,Etats.SNAKE)
    }
  }
  createBoard=()=>{
    for(let i=0;i<this.size*this.size;i++){
        this.board.push(Etats.EMPTY)
    }
  }
  placeApple=()=>{
    let whereApple=Math.random()*((this.size*this.size)-(this.snake.snakeBody.length+2))
    this.apple=0
    while(whereApple>=0){
      this.apple++
      if(this.state.board[this.apple]===Etats.EMPTY){
        whereApple--
      }
    }
    this.changeSquare(this.apple,Etats.APPLE)
  }
  onKeyDown=(event)=>{
    switch(event.keyCode){
      case 37:
        if(this.direction!==Direction.RIGHT){
          this.bufferDirection=Direction.LEFT
        }
        break;
      case 38:
        if(this.direction!==Direction.DOWN){
          this.bufferDirection=Direction.UP
        }
        break;
      case 39:
        if(this.direction!==Direction.LEFT){
          this.bufferDirection=Direction.RIGHT
        }
        break;
      case 40:
        if(this.direction!==Direction.UP){
          this.bufferDirection=Direction.DOWN
        }
        break;
      default:
        break;
    }
  }
  componentDidMount(){
    this.startInterval()
    document.addEventListener("keydown", this.onKeyDown);
  }
  componentWillUnmount() {
    this.stopInterval();  
  }
  lost=()=>{
    this.stopInterval();  
    this.state = {gameOver: true};
    console.log("game over"+(!this.gameOver && !this.gameWon))
  }
  win=()=>{
    this.stopInterval();  
    this.state = {gameWon: true};
    console.log("You have won")
  }
  changeSquare=(c,etat)=>{
    this.board[c]=etat
    this.setState({board: this.board})
  }

  moveSnake=(c)=>{
    this.snake.snakeBody.push(this.snake.snakeHead)
    this.changeSquare(this.snake.snakeHead,Etats.SNAKE)
    this.snake.snakeHead=c
    this.changeSquare(this.snake.snakeHead,Etats.HEAD)
    if(this.snake.snakeBody.length<this.size*this.size-1){
      if(c===this.apple){//test if the snake ate an apple, if he did replace the apple
        this.placeApple()
      }
      else{
        this.changeSquare(this.snake.snakeBody.shift(),Etats.EMPTY)//Make disapear the last square of the tail
      }
    }
    else{
      this.win()
    }
  }
  move=()=>{ 
    this.direction=this.bufferDirection
    switch(this.direction){
      case Direction.DOWN:
        if((this.snake.snakeHead+this.size)<(this.size*this.size) && this.state.board[this.snake.snakeHead+this.size]!==Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead+this.size)
        }
        else{
          this.lost()
        }
        break;
      case Direction.RIGHT:
        if((this.snake.snakeHead+1)%this.size!==0 && this.state.board[this.snake.snakeHead+1]!==Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead+1)
        }
        else{
          this.lost()
        }
        break;
      case Direction.LEFT:
        if((this.snake.snakeHead)%this.size!==0 && this.state.board[this.snake.snakeHead-1]!==Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead-1)
        }
        else{
          this.lost()
        }
        break;
      case Direction.UP:
        if(this.snake.snakeHead>=this.size  && this.state.board[this.snake.snakeHead-this.size]!==Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead-this.size)
        }
        else{
          this.lost()
        }
        break;
      default:
        break;
    }
    
  }
  render(){
    return (
      <div>
        <div class="topbar"><Topbar setSize = {this.setSize}></Topbar></div>

        <div class="content">
          <div id="board">< Board size={this.size} board={this.board}/></div>
        </div>
      </div>
    );  
  }
}

export default App;
