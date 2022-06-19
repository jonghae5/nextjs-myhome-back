const express = require('express');
const { Apartment, Ability } = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const { sequelize } = require('../models');
const Sequelize = require('sequelize');

// POST /map
router.post('/', isLoggedIn, async (req, res) => {
  try {
    console.log(req.user.data.id, req.body.id);
    if (req.user.data.id === parseInt(req.body.id, 10)) {
      const lowX = req.body.lowX;
      const lowY = req.body.lowY;
      const highX = req.body.highX;
      const highY = req.body.highY;
      const lowSquare = req.body.squareValue[0];
      const highSquare = req.body.squareValue[1];
      const query = `SELECT A.id, A.거래금액, A.건축년도, CONCAT(A.년,A.월,A.일) 거래일자,CONCAT(A.법정동," ",A.지번) 주소, A.아파트, A.전용면적, A.층,A.x, A.y FROM apartment AS A 
        INNER JOIN(SELECT 아파트,층,전용면적 MAX(CONCAT(년,월,일)) 거래일자 FROM apartment GROUP BY 아파트,층,전용면적) B
        ON CONCAT(A.년,A.월,A.일)= B.거래일자 AND A.아파트 = B.아파트 AND A.층 = B.층 AND A.전용면적=B.전용면적
        WHERE A.x >=${lowX} AND A.x<=${highX} AND A.y >=${lowY} AND A.y<=${highY} AND A.전용면적 >=${lowSquare} AND A.전용면적<=${highSquare} `;

      const data = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });

      res.status(200).json(data);
    } else {
      console.log('사용자가 일치하지 않습니다.');
    }
  } catch (err) {
    console.error(err);
  }
});

// POST /map/detail
router.post('/detail', isLoggedIn, async (req, res) => {
  try {
    const apartment = req.body.아파트;
    const year = req.body.건축년도;
    const squareValue = req.body.전용면적;
    const address = req.body.주소;
    const query = `SELECT 아파트,x,y,거래금액,건축년도,년,월,일,법정동,지번,전용면적,층 
                    FROM apartment WHERE 아파트='${apartment}' AND 건축년도='${year}' AND CONCAT(법정동,' ',지번)='${address}' 
                    AND 전용면적>=${squareValue - 5} AND 전용면적<=${
      squareValue + 5
    } ORDER BY STR_TO_DATE(CONCAT(년,'-',월,'-',일),'%Y-%m-%d') DESC`;

    console.log(query);
    const data = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

// POST /map/ability
router.post('/ability/:id', isLoggedIn, async (req, res) => {
  try {
    console.log(req.user.data.id, req.params.id);
    if (req.user.data.id === parseInt(req.params.id, 10)) {
      const allowData = await Ability.findOne({
        attributes: ['allow'],
        where: { UserId: req.user.data.id },
      });
      console.log(allowData);
      const lowPrice = allowData['allow'] - 10000;
      const highPrice = allowData['allow'] + 10000;
      const lowX = req.body.lowX;
      const lowY = req.body.lowY;
      const highX = req.body.highX;
      const highY = req.body.highY;
      const lowSquare = req.body.squareValue[0];
      const highSquare = req.body.squareValue[1];

      const query = `SELECT A.id, A.거래금액, A.건축년도, A.년,A.월,A.일,CONCAT(A.법정동," ",A.지번) 주소, A.아파트, A.전용면적, A.층,A.x, A.y FROM apartment AS A 
      INNER JOIN(SELECT 아파트, MAX(CONCAT(년,월,일)) 거래일자 FROM apartment GROUP BY 아파트) B
      ON CONCAT(A.년,A.월,A.일)= B.거래일자 AND A.아파트 = B.아파트 
      WHERE A.거래금액 >=${lowPrice} AND A.거래금액 <=${highPrice} AND A.x >=${lowX} AND A.x<=${highX}
      AND A.y >=${lowY} AND A.y<=${highY} AND A.전용면적 >=${lowSquare} AND A.전용면적<=${highSquare} `;

      const data = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });

      res.status(200).json(data);
    } else {
      console.log('사용자가 일치하지 않습니다.');
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
