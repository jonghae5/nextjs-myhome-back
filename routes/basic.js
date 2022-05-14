const express = require('express');
const { User, Ability, Basic } = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');

// POST /basic/ability
router.post('/ability', isLoggedIn, async (req, res) => {
  try {
    if (req.user.id === req.body.id) {
      const basicAbility = await Basic.findOne({
        where: { UserId: req.body.id },
      });

      if (basicAbility) {
        await Basic.update(
          {
            UserId: req.body.id,
            yearMoney: req.body.yearMoney,
            savingRatioMoney: req.body.savingRatioMoney,
            mortgageLoan: req.body.mortgageLoan,
          },
          {
            where: {
              UserId: req.user.id,
            },
          }
        );
      } else {
        await Basic.create({
          UserId: req.body.id,
          yearMoney: req.body.yearMoney,
          savingRatioMoney: req.body.savingRatioMoney,
          mortgageLoan: req.body.mortgageLoan,
        });
      }
      const finalBasicAbility = await Basic.findOne({
        attributes: ['yearMoney', 'savingRatioMoney', 'mortgageLoan'],
        where: { UserId: req.user.id },
      });

      res.status(200).json(finalBasicAbility);
    } else {
      console.log('엥 왜 안돼');
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
