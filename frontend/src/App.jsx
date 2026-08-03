import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);

  function fetchnote() {
    axios.get("http://localhost:3000/api/note").then((res) => {
      setnotes(res.data.notes || []);
    });
  }

  useEffect(() => {
    fetchnote();
  }, []);

  function deletenote(noteID) {
    axios.delete("http://localhost:3000/api/note/" + noteID).then(() => {
      fetchnote();
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, msg } = e.target.elements;

    axios
      .post("http://localhost:3000/api/note", {
        title: title.value,
        msg: msg.value,
      })
      .then(() => {
        fetchnote();
        e.target.reset(); // Input fields clear karne ke liye
      });
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Quick Notes</h1>
        <p>Keep your ideas organised in one place</p>
      </header>

      {/* Note Creation Form */}
      <form className="note-create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            name="title" 
            type="text" 
            placeholder="Title" 
            required 
          />
          <input 
            name="msg" 
            type="text" 
            placeholder="Write a note..." 
            required 
          />
        </div>
        <button type="submit" className="btn btn-create">
          + Create Note
        </button>
      </form>

      {/* Grid of Notes */}
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id || note.id}>
            <div className="note-content">
              <h1>{note.title}</h1>
              <p>{note.msg}</p>
            </div>
            <button
              className="btn btn-delete"
              onClick={() => deletenote(note._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;