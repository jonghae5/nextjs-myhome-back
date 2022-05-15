const express = require('express');
const router = express.Router();
const { User, Ability } = require('../models');

// GET USER INFO
router.get('/', async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        attributes: ['id', 'email', 'nickname', 'snsId', 'provider'],
        where: { id: parseInt(req.user.data.id, 10) },
      });

      const ability = await Ability.findOne({
        attributes: ['UserId'],
        where: { UserId: parseInt(req.user.data.id, 10) },
      });

      // const compare = await Compare.findOne({
      //   attributes: ['UserId'],
      //   where: { UserId: parseInt(req.user.data.id, 10) },
      // });

      const userData = user.toJSON();
      userData.abilityWrite = Boolean(ability);
      // console.log(userData);
      return res.status(200).json(userData);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
