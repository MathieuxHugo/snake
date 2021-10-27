import './App.css';

import Board from './Board'
import React from 'react';
import Etats from './Etats';


const Direction={
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right"
}

class App extends React.Component{
  constructor(){
    super()
    this.size=4
    this.board=[]
    this.createBoard()
    this.state={gameOver: false,board:this.board}
    this.snake={snakeHead: 1,snakeBody: [0]}
    this.apple=4*this.size+(this.size/2)
    this.direction=Direction.DOWN
    this.bufferDirection=Direction.DOWN
    this.growBody=false
    this.placeSnake()
    this.placeApple()
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
      console.log("placeApple"+this.apple)
      if(this.state.board[this.apple]==Etats.EMPTY){
        whereApple--
      }
    }
    this.changeSquare(this.apple,Etats.APPLE)
  }
  onKeyDown=(event)=>{
    switch(event.keyCode){
      case 37:
        if(this.direction!=Direction.RIGHT){
          this.bufferDirection=Direction.LEFT
        }
        break;
      case 38:
        if(this.direction!=Direction.DOWN){
          this.bufferDirection=Direction.UP
        }
        break;
      case 39:
        if(this.direction!=Direction.LEFT){
          this.bufferDirection=Direction.RIGHT
        }
        break;
      case 40:
        if(this.direction!=Direction.UP){
          this.bufferDirection=Direction.DOWN
        }
        break;
      default:
        break;
    }
  }
  componentDidMount(){
    this.timerID = setInterval(()=>this.move(),1000)
    document.addEventListener("keydown", this.onKeyDown);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);  
  }
  gameOver=()=>{
    clearInterval(this.timerID);
    console.log("game over")
    this.setState({gameOver: true});
  }
  gameWon=()=>{
    clearInterval(this.timerID);
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
      if(c==this.apple){//test if the snake ate an apple, if he did replace the apple
        this.placeApple()
      }
      else{
        this.changeSquare(this.snake.snakeBody.shift(),Etats.EMPTY)//Make disapear the last square of the tail
      }
    }
    else{
      this.gameWon()
    }
  }
  move=()=>{ 
    this.direction=this.bufferDirection
    switch(this.direction){
      case Direction.DOWN:
        if((this.snake.snakeHead+this.size)<(this.size*this.size) && this.state.board[this.snake.snakeHead+this.size]!=Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead+this.size)
        }
        else{
          this.gameOver()
        }
        break;
      case Direction.RIGHT:
        if((this.snake.snakeHead+1)%this.size!=0 && this.state.board[this.snake.snakeHead+1]!=Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead+1)
        }
        else{
          this.gameOver()
        }
        break;
      case Direction.LEFT:
        if((this.snake.snakeHead)%this.size!=0 && this.state.board[this.snake.snakeHead-1]!=Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead-1)
        }
        else{
          this.gameOver()
        }
        break;
      case Direction.UP:
        if(this.snake.snakeHead>=this.size  && this.state.board[this.snake.snakeHead-this.size]!=Etats.SNAKE){
          this.moveSnake(this.snake.snakeHead-this.size)
        }
        else{
          this.gameOver()
        }
        break;
    }
  }
  render(){
    return (
      <div id="board">< Board size={this.size} board={this.board}/>
      </div>
    );  
  }
}

export default App;
