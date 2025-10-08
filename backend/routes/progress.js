// in backend/routes/progress.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');

// @route   GET api/progress
// @desc    Get all progress for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find all progress and populate the 'lesson' field to get its details
    const userProgress = await Progress.find({ user: req.user.id }).populate(
      'lesson',
      ['day'] // We only need the 'day' field from the Lesson document
    );
    res.json(userProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;