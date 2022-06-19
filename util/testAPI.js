/* 부동산 Data 가져오기 */

const { response } = require('express');
const { Apartment } = require('../models');
const { Dong } = require('../models');
const { sequelize } = require('../models');
const request = require('request');
const convert = require('xml-js');
const Sequelize = require('sequelize');
const { dataAPI } = require('./dataAPI');
const Op = Sequelize.Op;
const axios = require('axios');
/*x,y 좌표 변환*/
exports.testAPI = async () => {
  //   const query = `SELECT A.id  id, CONCAT(B.법정동명,A.법정동," ",A.지번) 주소 FROM apartment AS A INNER JOIN
  // (SELECT 법정동코드5자리, 법정동명 FROM dong WHERE id IN (SELECT MIN(id) FROM dong GROUP BY 법정동코드5자리)) AS B
  // ON A.법정동시군구코드=B.법정동코드5자리 WHERE A.x=0`;
  const query = `SELECT A.id  id, CONCAT(B.법정동명," ",A.도로명," ",A.도로명건물본번호코드,"-",A.도로명건물부번호코드) 주소 FROM apartment AS A INNER JOIN
(SELECT 법정동코드5자리, 법정동명 FROM dong WHERE id IN (SELECT MIN(id) FROM dong GROUP BY 법정동코드5자리)) AS B
ON A.법정동시군구코드=B.법정동코드5자리 WHERE A.x IS NULL`;
  const apartData = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  console.log(apartData);

  async function getLatLng(idx) {
    const kakaoOptions = {
      url: 'https://dapi.kakao.com//v2/local/search/address', // target에 해당하는 것을 적기
      method: 'GET',
      headers: {
        Authorization: 'KakaoAK ' + process.env.KAKAO_CLIENT_ID,
      },
      qs: {
        // query: apartData[idx]['주소'], // 현재 책으로 검색할 것이라 책 제목을 적었다.
        query: apartData[idx]['주소'],
      },
      encoding: 'UTF-8',
    };

    request(kakaoOptions, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        const addresses = JSON.parse(body);

        if (addresses['documents'].length > 0) {
          const address = addresses['documents'][0];
          const x = parseFloat(address['x']).toFixed(5);
          const y = parseFloat(address['y']).toFixed(5);
          const resultData = { x, y, id: apartData[idx]['id'] };
          console.log(x, y);
          //   await Apartment.update(
          //     { x: resultData[x], y: resultData[y] },
          //     { where: { id: resultData['id'] } }
          //   );
          console.log(resultData);

          const updateXYQuery = `UPDATE apartment SET x=${resultData['x']},y=${resultData['y']} WHERE id=${resultData['id']}`;
          sequelize.query(updateXYQuery, {
            type: Sequelize.QueryTypes.UPDATE,
          });

          console.log(idx);
        }
      }
    });
  }
  console.log(apartData.length);
  //   for (var idx = 0; idx < apartData.length; idx++) {
  //     await getLatLng(idx);
  //     console.log(idx);
  //   }
  for (let idx = 0; idx < 1000; idx++) {
    await getLatLng(idx);
  }
};

/* 정규식 변환 */
exports.test2API = async () => {
  const query = `SELECT id, 거래금액 FROM apartment`;
  const data = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  const regex = /[^0-9]/g;

  for (var i = 0; i < data.length; i++) {
    const result = data[i]['거래금액'].replace(regex, '');
    const resultData = { id: data[i]['id'], 거래금액: result };
    console.log(resultData);
    const updateQuery = `UPDATE apartment SET 거래금액=${resultData['거래금액']} WHERE id=${resultData['id']}`;
    await sequelize.query(updateQuery, {
      type: Sequelize.QueryTypes.UPDATE,
    });
  }
};

/* 능력에 따른 아파트 쿼리 */
exports.test3API = async () => {
  const query = `SELECT A.id, A.거래금액, A.건축년도, CONCAT(A.법정동," ",A.지번) 주소, A.전용면적, A.층,A.x, A.y FROM apartment AS A \
  INNER JOIN(SELECT 아파트, MAX(CONCAT(년,월,일)) 거래일자 FROM apartment GROUP BY 아파트) B
  ON A.아파트 = B.아파트 AND CONCAT(A.년,A.월,A.일)= B.거래일자 
  WHERE A.거래금액 >=70000 AND A.거래금액 <=80000`;
  const data = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  console.log(data);
};

/* 월, 일자 0 붙이기 */
exports.test4API = async () => {
  const query = `SELECT id, 월 FROM apartment`;
  const data = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i]['월'], 10) < 10) {
      const day = '0' + data[i]['월'];

      const updateQuery = `UPDATE apartment SET 월='${day}' WHERE id=${data[i]['id']}`;
      await sequelize.query(updateQuery, {
        type: Sequelize.QueryTypes.UPDATE,
      });
    }
  }

  console.log(data);
};

/* 중복데이터 제거 */

// DELETE FROM `react-myhome`.apartment
// WHERE id IN (SELECT id
//              FROM (
//                  SELECT id, ROW_NUMBER() OVER (PARTITION BY 아파트, 년, 월, 일, 거래금액) as row_num
//                  FROM `react-myhome`.apartment
//                  ) tmp
//              WHERE row_num > 1);

// DELETE t1.* FROM `react-myhome`.apartment AS t1 JOIN `react-myhome`.apartment AS t2 ON t1.아파트=t2.아파트 AND t1.월=t2.월 AND t1.년=t2.년 AND t1.일=t2.일 AND t1.거래금액=t2.거래금액 WHERE t1.id > t2.id;
// const query =
// `DELETE t1.* FROM apartment AS t1
// JOIN apartment AS t2
// ON t1.아파트=t2.아파트 AND t1.년=t2.년 AND t1.월=t2.월 AND t1.일=t2.일 AND t1.거래금액=t2.거래금액
// WHERE t1.id > t2.id`
