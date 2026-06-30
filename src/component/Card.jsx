import { useState } from 'react'

function Card(){
    return(
        <div>
             <div className="hello"> 
               
                <div className="my">
                <h1>My Hello board</h1>
        <div className="group">
        <button className="icon-btn"><i className="fa-solid fa-chart-simple"></i><i class="fa-solid fa-angle-down"></i></button>
        <span className="tooltip">view</span>
        </div>
         </div>
     
  <div className="header-right">
      <div className="group">
        <button className="icon-btn"><i class="fa-solid fa-plug"></i></button>
        <span className="tooltip">Power-up</span>
        </div>

        <div className="group">
        <button className="icon-btn"> <i className="fa-solid fa-bolt"></i></button>
        <span className="tooltip">Automation</span>
        </div>

       <div className="group">
        <button className="icon-btn"> <i className="fa-solid fa-bars"></i></button>
        <span className="tooltip">Filter cards[F]</span>
        </div>

    
        <div className="group">
        <button className="icon-btn"><i className="fa-regular fa-star"></i> </button>
        <span className="tooltip">Click to star or unstar this board.<br></br>Starred boards show up at the top of<br></br> your boards list.</span>
        </div>

         <div className="group">
        <button className="icon-btn"><i className="fa-solid fa-user-group"></i></button>
        <span className="tooltip">Change Visibility</span>
        </div>

        <div className="groups">
        <button className="icon-btns"><i className="fa-solid fa-user-plus"></i>share</button>
        <span className="tooltips">Share board</span>
        </div>
        
        <div className="group">
        <button className="icon-btn"> <i className="fa-solid fa-ellipsis"></i></button>
        <span className="tooltip">power</span>
        </div>
        </div>
    </div>
    </div>
  )
 
}
export default Card