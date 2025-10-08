// in backend/routes/progress.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // THIS LINE FIXES THE ERROR
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

// @route   GET api/progress
// @desc    Get all progress for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userProgress = await Progress.find({ user: req.user.id })
      .populate('lesson', ['day']);
    res.json(userProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/progress
// @desc    Update progress for a lesson
// @access  Private
router.post('/', auth, async (req, res) => {
  const { lessonId, status } = req.body;

  if (status !== 'completed') {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }

    const progress = await Progress.findOneAndUpdate(
      { user: req.user.id, lesson: lessonId },
      { status: 'completed', completedAt: new Date() },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { xp: lesson.rewards.xp || 0 }
    });

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/progress/activity
// @desc    Get user's XP activity for the last 7 days
// @access  Private
router.get('/activity', auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activity = await Progress.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: 'completed',
          completedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $lookup: {
          from: 'lessons',
          localField: 'lesson',
          foreignField: '_id',
          as: 'lessonDetails',
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
          totalXp: { $sum: { $arrayElemAt: ['$lessonDetails.rewards.xp', 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;