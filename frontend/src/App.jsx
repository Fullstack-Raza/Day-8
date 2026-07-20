import { useState,useEffect } from "react";
import axios from "axios";
function App() {
  const [notes, setnotes] = useState([]);
  
  useEffect(()=>{axios.get("http://localhost:3000/api/note").then((res) => {
    setnotes(res.data.notes);
    
  });},[])
  
  return (
    <>
      <div className="notes">
        {notes.map((note,idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.msg}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
