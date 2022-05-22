const express = require('express');
const router = express.Router();
const { User, Ability, Basic } = require('../models');
const { isLoggedIn } = require('./middlewares');

// GET USER INFO
router.get('/', async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        attributes: ['id', 'email', 'nickname', 'snsId', 'provider'],
        where: { id: parseInt(req.user.data.id, 10) },
      });

      const ability = await Ability.findOne({
        attributes: ['allow', 'allowMoney', 'allowJeonse', 'allowLoan'],
        where: { UserId: parseInt(req.user.data.id, 10) },
      });

      // const compare = await Compare.findOne({
      //   attributes: ['UserId'],
      //   where: { UserId: parseInt(req.user.data.id, 10) },
      // });

      const userData = user.toJSON();
      const abilityData = ability ? ability.toJSON() : null;
      userData.abilityWrite = Boolean(abilityData);

      return res
        .status(200)
        .json({ userData: userData, abilityData: abilityData });
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
  }
});

// POST /ability/:id
router.post('/ability/:id', isLoggedIn, async (req, res) => {
  try {
    if (req.user.data.id === parseInt(req.params.id, 10)) {
      const ability = await Ability.findOne({
        where: { UserId: req.user.data.id },
      });
      const basic = await Basic.findOne({
        where: { UserId: req.user.data.id },
      });
      const { id, ...data } = req.body;

      // 투자 가능 금액 = 현금성 자산 + 주택 관련 자금 - 기존 대출 금액
      // 추가대출능력 30년 기준 저축액 * 30 / (금리)
      // 전세감당능력 30년 기준 저축액 * 30 / (금리 * 2)
      const moneySum =
        data.stockMoney +
        data.bitcoinMoney +
        data.savingMoney +
        data.insuranceMoney +
        data.severanceMoney +
        data.etcMoney;

      const loanSum =
        data.schoolLoan +
        data.jutaekLoan +
        data.jeonWolLoan +
        data.businessLoan +
        data.tenantLoan +
        data.etcLoan +
        data.creditLoan;

      const homeSum = data.jeonDepositHome + data.jutaekPriceHome;

      const allowMoney = moneySum + homeSum - loanSum;

      const allowLoan =
        (basic.yearMoney * (basic.savingRatioMoney / 100) * 30) /
        basic.mortgageLoan;
      const allowJeonse = allowLoan / 2;

      const allow = allowMoney + allowLoan + allowJeonse;

      const allowData = { allow, allowJeonse, allowLoan, allowMoney };
      if (ability) {
        await Ability.update(
          {
            UserId: req.user.data.id,
            ...data,
            ...allowData,
          },
          {
            where: {
              UserId: req.user.data.id,
            },
          }
        );
      } else {
        await Ability.create({
          UserId: req.user.data.id,
          ...data,
          ...allowData,
        });
      }

      const finalAllowAbility = await Ability.findOne({
        attributes: ['allow', 'allowJeonse', 'allowLoan', 'allowMoney'],
        where: { UserId: req.user.data.id },
      });
      console.log(finalAllowAbility);
      res.status(200).json(finalAllowAbility);
    } else {
      console.log('엥 왜 안돼');
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
