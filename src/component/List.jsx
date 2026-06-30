import axios from "axios"
import { useState, useEffect, useRef } from 'react'
function List() {

const fetchBoards=async () =>{
  const result =await axios.get("http://localhost:8080/boards");
  setLists(result.data);

  console.log(result.data);
};
useEffect(()=>{
  fetchBoards();
},[]);

const addBoard=async()=>{
  const result=await axios.post("http://localhost:8080/boards",
    {
      title:title
    }
  );
  console.log (result.data);
}
const deleteBoard = async()=>{
  const result=await axios.post("http://localhost:8080/boards/${id}",);
  console.log (result.data);
}

  const listNames = ["Today", "Tomorrow", "Next Week"];
  const [lists, setLists] = useState([ { title: "Today", cards: [] } ]);
  const [listMenu, setListMenu] = useState(null);
  const [showInput, setShowInput] = useState(null);
  const [text, setText] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editText, setEditText] = useState("");
  const [showLabelPopup, setShowLabelPopup] = useState(null);
  const [showCoverPopup, setShowCoverPopup] = useState(null);
  const [showDatePopup, setShowDatePopup] = useState(null);
  const popupRef = useRef(null);

  // calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const labelList = [
    { name: "python", color: "green" },
    { name: "design", color: "yellow" },
    { name: "bug", color: "orange" },
    { name: "feature", color: "red" } ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLabelPopup(null);
        setShowCoverPopup(null);
        setShowDatePopup(null);  }};
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside);  }; }, []);

  //  CALENDAR FUNCTIONS
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); };
  const getFirstDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();};
  const changeMonth = (type) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (type === "next" ? 1 : -1));
    setCurrentMonth(newMonth); };
  const addCard = (listIndex) => {
    if (!text) return;
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.push({
      text: text,
      labels: [],
      cover: "",
      date: ""
    });
    setLists(updatedLists);
    setText("");
    setShowInput(null); };
  const deleteCard = (listIndex, cardIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.splice(cardIndex, 1);
    setLists(updatedLists);};
  const addList = () => {
    if (lists.length >= listNames.length) return;
    const newListName = listNames[lists.length];
    setLists([...lists, { title: newListName, cards: [] }]);};
  const startEdit = (listIndex, cardIndex) => {
    setEditData({ listIndex, cardIndex });
    setEditText(lists[listIndex].cards[cardIndex].text);
    setActiveMenu(null);};
  const saveEdit = () => {
    const updatedLists = [...lists];
    updatedLists[editData.listIndex].cards[editData.cardIndex].text = editText;
    setLists(updatedLists);
    setEditData(null);};
  const toggleLabel = (listIndex, cardIndex, label) => {
    const updatedLists = [...lists];
    const card = updatedLists[listIndex].cards[cardIndex];
    const exists = card.labels.find(l => l.name === label.name);
    if (exists) {
      card.labels = card.labels.filter(l => l.name !== label.name);
    } else {
      card.labels.push(label); }
    setLists(updatedLists);};
  const setCover = (listIndex, cardIndex, color) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards[cardIndex].cover = color;
    setLists(updatedLists);};
  const setDate = (listIndex, cardIndex, date) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards[cardIndex].date = date;
    setLists(updatedLists);};

 // move
const [showMovePopup, setShowMovePopup] = useState(null);
const [moveData, setMoveData] = useState({
  toList: 0,
  position: 0
});
const moveCard = (fromListIndex, fromCardIndex) => {
  const updatedLists = [...lists];
  const card = updatedLists[fromListIndex].cards.splice(fromCardIndex, 1)[0];
  updatedLists[moveData.toList].cards.splice(
    moveData.position,
    0,
    card);
  setLists(updatedLists);
  setShowMovePopup(null);};
// copy code
const [copyPopup, setCopyPopup] = useState(null);
const [copyText, setCopyText] = useState("");
const copyCard = () => {
  const { listIndex, cardIndex } = copyPopup;
  const updatedLists = [...lists];
  const card = updatedLists[listIndex].cards[cardIndex];
  updatedLists[listIndex].cards.push({
    text: copyText || card.text,
    labels: [...card.labels],
    cover: card.cover,
    date: card.date});
  setLists(updatedLists);
  setCopyPopup(null);
  setCopyText("")};

// copy link
const copyLink = (listIndex, cardIndex) => {
  const url = `${window.location.origin}/card/${listIndex}-${cardIndex}`;
  navigator.clipboard.writeText(url);
  alert("Link copied!");};
  return (
    <div className="names">
      {lists.map((list, listIndex) => (
        <div className="board" key={listIndex}>
          <h3>{list.title}
           <span className='menu-icon'
  onClick={() => { const updated = [...lists];updated.splice(listIndex, 1);
    setLists(updated);}}
  style={{ cursor: "pointer", fontSize: "20px",}}> ⋯ </span>
   </h3>
     {list.cards.map((card, cardIndex) => (
            <div className="card" key={cardIndex} style={{ background: card.cover || "white" }} >
  {listMenu === listIndex && (
  <div className="list-popup">
    <p onClick={() => { const updated = [...lists]; updated.splice(listIndex, 1); // delete list setLists(updated);
     setListMenu(null);
      }} > Delete List </p>
 <p onClick={() => setListMenu(null)}>Close</p>
</div>)}
    
  {/* LABEL */}
 <div className="label-overlay">
   {card.labels.map((l, i) => (
 <div key={i} className={`label-bar ${l.name}`}></div> ))}
     </div>
     {/* EDIT */}
     {editData && editData.listIndex === listIndex && editData.cardIndex === cardIndex ? (

     <div>
   <input value={editText} onChange={(e) => setEditText(e.target.value)}
       className="edit-input" />
  <button onClick={saveEdit} className="about">Save</button>
  </div>
  ) : (
   <>
   <div className="card-row">
   <span>{card.text}</span>
    {card.date && (
     <span className="date-badge">
     {new Date(card.date).toLocaleDateString()}
   </span>)}</div>
 <div className="icons">
   <span onClick={() =>  setActiveMenu({ listIndex, cardIndex })}>
   <i className="fa-regular fa-pen-to-square"></i></span>
<span onClick={() => deleteCard(listIndex, cardIndex)}>
 <i className="fa-solid fa-trash-can"></i> </span>
     </div>
   </>)} 
 {/* MENU */}
 {activeMenu && activeMenu.listIndex === listIndex && activeMenu.cardIndex === cardIndex && (

 <div className="trello-menu">

  <p onClick={() => startEdit(listIndex, cardIndex)}><i class="fa-regular fa-credit-card"></i>Open Card</p>

  <p onClick={() => { setShowLabelPopup({ listIndex, cardIndex }); setActiveMenu(null); }}><i class="fa-solid fa-wand-magic-sparkles"></i>Edit labels</p>
 <p><i class="fa-regular fa-user"></i>Change members</p>
 <p onClick={() => { setShowCoverPopup({ listIndex, cardIndex }); setActiveMenu(null); }}>
 <i class="fa-regular fa-image"></i>Change cover</p>

 <p onClick={() => { setShowDatePopup({ listIndex, cardIndex }); setActiveMenu(null);}}>
 <i class="fa-regular fa-clock"></i> Edit dates</p>

  <p onClick={() =>  {setShowMovePopup({ listIndex, cardIndex }); setActiveMenu(null);}}>
 <i class="fa-solid fa-arrow-right-long"></i> Move</p>
<p onClick={() => {setCopyPopup({ listIndex, cardIndex });
  setCopyText(card.text);
  setActiveMenu(null);
}}>
 <i class="fa-solid fa-clone"></i> Copy card
</p>

                  

<p onClick={() => copyLink(listIndex, cardIndex)}>
 <i class="fa-solid fa-link"></i> Copy link
</p>

                  <p onClick={() => deleteCard(listIndex, cardIndex)}>
                   <i class="fa-solid fa-box-archive"></i> Archive
                  </p>
                  <p onClick={() => setActiveMenu(null)}><i class="fa-solid fa-xmark"></i>Close</p>
                </div>
              )}

              {/* ✅ DATE POPUP (UPDATED ONLY THIS) */}
              {showDatePopup &&
                showDatePopup.listIndex === listIndex &&
                showDatePopup.cardIndex === cardIndex && (

                <div className="date-popup" ref={popupRef}>

                  <div className="calendar-header">
                    <button onClick={() => changeMonth("prev")}>◀</button>

                    <span>
                      {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric"
                      })}
                    </span>

                    <button onClick={() => changeMonth("next")}>▶</button>
                  </div>

                  <div className="calendar-grid">

                    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>(
                      <div key={i} className="day-name">{d}</div>
                    ))}

                    {[...Array(getFirstDay(currentMonth))].map((_,i)=>(
                      <div key={"empty"+i}></div>
                    ))}

                    {[...Array(getDaysInMonth(currentMonth))].map((_,i)=>(
                      <div
                        key={i}
                        className="day"
                        onClick={()=>{
                          const selectedDate = new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            i+1
                          );
                          setDate(listIndex, cardIndex, selectedDate);
                          setShowDatePopup(null);
                        }}
                      >
                        {i+1}
                      </div>
                    ))}

                  </div>

                </div>
              )}



{/* move popup */}
{showMovePopup &&
 showMovePopup.listIndex === listIndex &&
 showMovePopup.cardIndex === cardIndex && (

  <div className="move-popup" ref={popupRef}>

    <h4>Move card</h4>

    <label>List</label>
    <select
      value={moveData.toList || 0}
      onChange={(e) =>
        setMoveData({ ...moveData, toList: Number(e.target.value) })
      }
    >
      {lists.map((l, i) => (
        <option key={i} value={i}>{l.title}</option>
      ))}
    </select>

    <label>Position</label>
    <select
      value={moveData.position || 0}
      onChange={(e) =>
        setMoveData({ ...moveData, position: Number(e.target.value) })
      }
    >
      {[...Array((lists[moveData.toList]?.cards.length || 0) + 1)]
        .map((_, i) => (
          <option key={i} value={i}>{i + 1}</option>
        ))}
    </select>

    <button
      onClick={() =>
        moveCard(showMovePopup.listIndex, showMovePopup.cardIndex)
      }
    >
      Move
    </button>

  </div>
)}

{/* copy card */}
{copyPopup &&
  copyPopup.listIndex === listIndex &&
  copyPopup.cardIndex === cardIndex && (

  <div className="copy-popup">
    <h4>Copy Card</h4>

    <input value={copyText} onChange={(e) => setCopyText(e.target.value)} />

    <button onClick={copyCard}>Create copy</button>
    <button onClick={() => setCopyPopup(null)}>Close</button>

  </div>
)}

              {/* LABEL POPUP */}
              {showLabelPopup &&
                showLabelPopup.listIndex === listIndex &&
                showLabelPopup.cardIndex === cardIndex && (

                <div className="label-popup" ref={popupRef}>
                   <h4 id="skys">Labels </h4>
                 <div id="sky1">
                 <input placeholder='search labels...' /> 
                 </div>
                 <p>Labels</p>
                  {labelList.map((label, i) => {
                    const checked = card.labels.some(l => l.name === label.name);

 return (                     
   <div key={i} className="label-row">
    <input type="checkbox" checked={checked} onChange={() => toggleLabel(listIndex, cardIndex, label) } />                     
                            <span className={`popup-color ${label.name}`}></span>
                             <i className="fa-regular fa-pen-to-square"></i> 
                       </div>
                    );
                  })}

                  <button className="port">Create a New Label</button>
                  
                  <button className="ports">Create a New Label</button>
                  
               </div>
              )}

               {/* COVER POPUP */}
               {showCoverPopup &&
                 showCoverPopup.listIndex === listIndex &&
                showCoverPopup.cardIndex === cardIndex && (

                <div className="cover-popup" ref={popupRef}>
                    <h4 className='mid'>Cover</h4>
                  <p>Size</p>
                  <div className='size'>
                    <img src="src/assets/card.png" alt="" />
                    <img src="src/assets/card.png" alt="" />
                  </div>

                  <p>Colors</p>
                   {["red","blue","green","orange","purple","black"].map((c,i)=>(
                    <div key={i} style={{ background:c, height:"30px", margin:"5px 0",
                         cursor:"pointer" }} onClick={()=>setCover(listIndex,cardIndex,c)}  >

                    </div>
                  ))}
                 </div>
              )}
             </div> 
          ))} 

          {/* ADD CARD */}
           {showInput === listIndex ? (
             <div id="update">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
              /><br />

              <button onClick={() => addCard(listIndex)} className="about">
                 Add
              </button>

               <button onClick={() => setShowInput(null)} className="abouts">
                 ✖
              </button>
             </div>
           ) : (
             <div className="time">
               <p onClick={() => setShowInput(listIndex)}>+ Add a card</p>

               <div className="addList" onClick={addList}>
                <i className="fa-regular fa-square-plus"></i>
               </div>
             </div>
          )}

          

         </div>
      ))}

    </div>

     )}
 export default List;


