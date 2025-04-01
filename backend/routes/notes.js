const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const userdetails = require("../middleware/userdetails");
const { body, validationResult } = require("express-validator");

// CREATE ROUTE: using GET method with /api/auth/getuser, Login Required
router.get("/fetchallnotes", userdetails, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// READ ROUTE: using POST method with /api/notes/addnote, Login Required
router.post(
  "/addnote",
  [
    body("Title", "Enter a Valid Tile").isLength({ min: 3 }),
    body("Description", "Please enter a valid Description").isLength({
      min: 5,
    }),
    body("Tag", "Enter the Tag").isLength({ min: 3 }),
  ],
  userdetails,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { Title, Description, Tag } = req.body;
      const note = new Notes({
        Title,
        Description,
        Tag,
        user: req.user.id,
      });
      const noteSaved = await note.save();
      console.log(noteSaved);
      res.json(noteSaved);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// UPDATE ROUTE: using PUT method with /api/notes/updatenote/:id, Login Required

router.put("/updatenote/:id", userdetails, async (req, res) => {
  try {
    const { Title, Description, Tag } = req.body;
    const newNote = {};
    if (Title) {
      newNote.Title = Title;
    }
    if (Description) {
      newNote.Description = Description;
    }
    if (Tag) {
      newNote.Tag = Tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE ROUTE: using DELETE method with /api/notes/deletenote/:id, Login Required

router.delete("/deletenote/:id", userdetails, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted..." });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
