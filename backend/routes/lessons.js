// in backend/routes/lessons.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lesson = require('../models/Lesson');

// @route   GET api/lessons/:day
// @desc    Get a lesson by its day number
// @access  Private
router.get('/:day', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ day: req.params.day });

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;