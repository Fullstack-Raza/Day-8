import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [notes, setnotes] = useState([]);
  function fetchnote() {
    axios.get("http://localhost:3000/api/note").then((res) => {
      setnotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchnote();
  }, []);

  function deletenote(noteID) {
    axios.delete("http://localhost:3000/api/note/" + noteID).then((res) => {
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
      .then((res) => {
        fetchnote();
      });
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="title" />
        <input name="msg" type="text" placeholder="msg" />
        <button type="submit">Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.msg}</p>
              <button
                onClick={(e) => {
                  deletenote(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
