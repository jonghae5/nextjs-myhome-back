const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        attributes: ['id', 'email', 'nickname', 'snsId', 'provider'],
        where: { snsId: req.user.snsId },
      });

      return res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
