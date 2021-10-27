
import './Board.css'
import Etats from './Etats'

const Square =(props)=>{
    return(
        <div id="square" className={props.etat} />
    )
}

const Row = (props)=>{
    return (<div id="row">
            {props.row.map((etat,i)=>{
                return (<Square key={i} etat={etat}/>)})}
        </div>)
}

const Board = (props)=>{
    var rows=[]
    for(let i=0; i<props.size;i++){
        rows.push(<Row key={i} row={props.board.slice(i*props.size,(i+1)*props.size)}/>)
    }
    return (<div>{rows}</div>)
}

export default Board;