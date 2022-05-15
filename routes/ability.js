const express = require('express');
const { Basic, Ability } = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');

// POST /ability
router.post('/:id', isLoggedIn, async (req, res) => {
  try {
    console.log('body입니다', req.body);
    if (req.user.data.id === parseInt(req.params.id, 10)) {
      const ability = await Ability.findOne({
        where: { UserId: req.user.data.id },
      });
      const data = req.body;
      if (ability) {
        await Ability.update(
          {
            UserId: req.user.data.id,
            data,
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
          data,
        });
      }

      const finalAbility = await Ability.findOne({
        attributes: [
          'stockMoney',
          'bitcoinMoney',
          'savingMoney',
          'insuranceMoney',
          'severanceMoney',
          'etcMoney',
          'jeonDepositHome',
          'jutaekPriceHome',
          'jeonWolLoan',
          'jutaekLoan',
          'tenantLoan',
          'creditLoan',
          'businessLoan',
          'schoolLoan',
          'etcLoan',
        ],
        where: { UserId: req.user.data.id },
      });
      console.log(finalAbility);
      res.status(200).json(finalAbility);
    } else {
      console.log('엥 왜 안돼');
    }
  } catch (error) {
    console.error(error);
  }
});

// GET /result/id
router.get('/result/:id', isLoggedIn, async (req, res) => {
  try {
    console.log(req);
    if (req.user.data.id === parseInt(req.params.id, 10)) {
      const ability = await Ability.findOne({
        where: { UserId: req.user.data.id },
      });

      const basic = await Basic.findOne({
        where: { UserId: req.user.data.id },
      });

      // 투자 가능 금액 = 현금성 자산 + 주택 관련 자금 - 기존 대출 금액
      // 추가대출능력 30년 기준 저축액 * 30 / (금리)
      // 전세감당능력 30년 기준 저축액 * 30 / (금리 * 2)

      // Backend에서 다 가져가야 한다.
      const moneySum =
        ability.stockMoney +
        ability.bitcoinMoney +
        ability.savingMoney +
        ability.insuranceMoney +
        ability.severanceMoney +
        ability.etcMoney;

      const loanSum =
        ability.schoolLoan +
        ability.jutaekLoan +
        ability.jeonWolLoan +
        ability.businessLoan +
        ability.tenantLoan +
        ability.etcLoan +
        ability.creditLoan;
      const homeSum = ability.jeonDepositHome + ability.jutaekPriceHome;

      const allowMoney = moneySum + homeSum - loanSum;

      const allowLoan =
        (basic.yearMoney * (basic.savingRatioMoney / 100) * 30) /
        basic.mortgageLoan;
      const allowJeonse = allowLoan / 2;
      const allow = allowMoney + allowLoan + allowJeonse;

      return res
        .status(200)
        .json({ allowMoney, allowLoan, allowJeonse, allow });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
