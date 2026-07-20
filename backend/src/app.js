const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json());
const notemodel = require("./models/notes.model");
app.get("/api/note", async (req, res) => {
  const notes = await notemodel.find();
  res.status(200).json({ msg: "notes fetched", notes });
});
app.post("/api/note", async (req, res) => {
  const { title, msg } = req.body;
  await notemodel.create({ title, msg });
  res.status(200).json({ msg: "note created" });
});
app.patch("/api/note/:id", async (req, res) => {
  const id = req.params.id;
  const { msg } = req.body;
  await notemodel.findByIdAndUpdate(id, {msg});
  res.status(200).json({ msg: "msg modifyad" });
});
app.delete("/api/note/:id",async(req,res)=>{
    const id = req.params.id
    await notemodel.findByIdAndDelete(id)
    res.status(200).json({msg:"note deleted"})
})
module.exports = app;
