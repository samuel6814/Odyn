// in backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
// We will need the Progress model later, but let's start with the User model.

// @route   GET api/dashboard
// @desc    Get current user's dashboard data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id is available from the auth middleware
    const user = await User.findById(req.user.id).select('-password');

    // For now, we'll just send back the main user data.
    // Later, we can add queries for progress, weekly activity, etc.
    const dashboardData = {
      name: user.name,
      xp: user.xp || 0, // Default to 0 if not set
      streak: user.streak?.current || 0, // Default to 0 if not set
    };

    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;