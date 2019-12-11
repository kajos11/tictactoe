import React from 'react';
import './Square.css'
function Square(props) {
    return(
      <span>
        <button 
        className="square" 
        onClick={()=>{props.onClick()}}>
          {props.value}
        </button>
        </span>
   )
}
  export default Square