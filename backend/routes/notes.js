const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const Note = require("../models/Notes");
const { validationResult, body } = require("express-validator");

//fetch all notes corresponding to user.
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.User.id });

  res.json(notes);
});

//add notes corresponding to user.
router.post(
  "/addnote",
  [body("title").notEmpty(), body("description").isLength({ min: 6 })],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(500).json({ error });
      }
      const note = await Note.create({
        user: req.User.id,
        title: title,
        description: description,
        tags: tags,
      });

      res.json(note);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
);

//update note
router.put(
  "/updatenote/:id",
  [body("title").notEmpty(), body("description").isLength({ min: 6 })],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(500).json({ error });
      }

      let newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tags) {
        newNote.tags = tags;
      }

      //

      let note = await Note.findById(req.params.id);

      if (!note) {
        res.status(404).json({ error: "Not Found !" });
      }

      if (note.user.toString() !== req.User.id) {
        return res.status(401).json({ error: "Not Allowed" });
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json({ note });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
);

//delete note
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //

    let note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404).json({ error: "Not Found !" });
    }

    if (note.user.toString() !== req.User.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({success: "Note Deleted ..."});
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
