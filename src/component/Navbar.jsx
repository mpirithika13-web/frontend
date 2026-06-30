import { useState } from 'react'

function Navbar(){
     const [count, setCount] = useState(0)

    return(
        <div>
<header>
<div id="board">
    <div id='board1'>
    <i className="fa-solid fa-table-cells-large"></i> 
    <i className="fa-brands fa-trello"></i>
    <h4 id="trello">Trello</h4>
    </div>
    
 <div className="now">
 <div className="search">
  <div id="search1">
     <i className="fa-solid fa-magnifying-glass"></i>
     <input type="text" placeholder='Search' />
  </div>
</div>
<p id="buttons">create</p>
</div> 

<div className='moon'>
<div className="power">
  <div className="group">
   <button className="icon-btn"><i className="fa-solid fa-bullhorn"></i></button> 
  </div>

  <div className="group">
   <button className="icon-btn"> <i className="fa-regular fa-bell"></i></button> 
  </div>

  <div className="group">
   <button className="icon-btn"><i className="fa-regular fa-circle-question"></i></button> 
  </div>

  <div className="group">
    <div className="out">
   <button className="icon-btn">Mp</button> 
   </div>
  </div>

  <div className='today'>
     <i className="fa-solid fa-ellipsis"></i>

  </div>
  </div>
  </div>
  </div>

  
  </header>
</div>
    )
}
export default Navbar;