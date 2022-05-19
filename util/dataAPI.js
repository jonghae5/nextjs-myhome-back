/* 부동산 Data 가져오기 */

const { response } = require('express');
const { Apartment } = require('../models');
const { Dong } = require('../models');

exports.dataAPI = async () => {
  const request = require('request');
  const convert = require('xml-js');
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;

  const dongDataSeoul = await Dong.findAll({
    attributes: [
      Sequelize.fn('DISTINCT', Sequelize.col('법정동코드5자리')),
      '법정동코드5자리',
    ],
    where: {
      법정동명: {
        [Op.like]: '%서울%',
      },
    },
    raw: true, // <--- HERE
  });
  const dongDataGG = await Dong.findAll({
    attributes: [
      Sequelize.fn('DISTINCT', Sequelize.col('법정동코드5자리')),
      '법정동코드5자리',
    ],
    where: {
      법정동명: {
        [Op.like]: '%경기%',
      },
    },
    raw: true, // <--- HERE
  });

  const dongDataIC = await Dong.findAll({
    attributes: [
      Sequelize.fn('DISTINCT', Sequelize.col('법정동코드5자리')),
      '법정동코드5자리',
    ],
    where: {
      법정동명: {
        [Op.like]: '%인천%',
      },
    },
    raw: true, // <--- HERE
  });
  const dongData = [...dongDataSeoul, ...dongDataIC, ...dongDataGG];
  console.log(dongData.length);
  //   const year = ['2020', '2021', '2022'];
  const year = ['2022'];
  const dateList = [];

  //   ibks-platform.tistory.com/176 [남산 아래 개발자들]

  for (var k = 0; k < dongData.length; k++) {
    for (var i = 0; i < year.length; i++) {
      for (var j = 1; j <= 12; j++) {
        if (j < 10) {
          j = '0' + j.toString();
        }
        dateList.push(year[i] + j.toString());
      }
    }
    // dateList.length
    for (var i = 0; i < 20; i++) {
      var url =
        'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev';
      var queryParams =
        '?' +
        encodeURIComponent('LAWD_CD') +
        '=' +
        dongData[k]['법정동코드5자리']; /* 동단위, 5자리*/
      queryParams +=
        '&' +
        encodeURIComponent('DEAL_YMD') +
        '=' +
        dateList[i]; /* 거래년월 '202201'*/
      queryParams +=
        '&' + encodeURIComponent('pageNo') + '=' + '1'; /* 페이지번호*/
      queryParams +=
        '&' + encodeURIComponent('numOfRows') + '=' + '5000'; /* numOfRows*/
      queryParams +=
        '&' +
        encodeURIComponent('serviceKey') +
        '=' +
        process.env.DATA_SECRET; /*Servicekey */
      queryParams += '&' + encodeURIComponent('numOfRows') + '1000';
      options = {
        method: 'GET',
        url: url + queryParams,
      };

      await request(options, function (error, res, body) {
        if (error) {
          throw new Error(error);
        } else {
          if (res.statusCode == 200) {
            const xmlToJson = convert.xml2json(body, {
              compact: true,
              spaces: 2,
            });

            var data = JSON.parse(xmlToJson).response.body?.items.item;
            // console.log(data.length);
            arr = [];
            if (data) {
              for (var i = 0; i < data.length; i++) {
                //   console.log(data[i]);
                // bulk Create 이용
                var info = {
                  거래금액: data[i].거래금액?._text || '',
                  건축년도: data[i].건축년도?._text || '',
                  도로명: data[i].도로명?._text || '',
                  도로명건물본번호코드:
                    data[i].도로명건물본번호코드?._text || '',
                  도로명건물부번호코드:
                    data[i].도로명건물부번호코드?._text || '',
                  도로명시군구코드: data[i].도로명시군구코드?._text || 0,
                  도로명일련번호번호코드:
                    data[i].도로명일련번호코드?._text || 0,
                  도로명지상지하코드: data[i].도로명지상지하코드?._text || 0,
                  도로명코드: data[i].도로명코드?._text || 0,
                  법정동: data[i].법정동?._text || '',
                  법정동본번코드: data[i].법정동본번코드?._text || 0,
                  법정동부번코드: data[i].법정동부번코드?._text || 0,
                  법정동시군구코드: data[i].법정동시군구코드?._text || 0,
                  법정동읍면동코드: data[i].법정동읍면동코드?._text || 0,
                  법정동지번코드: data[i].법정동지번코드?._text || 0,
                  아파트: data[i].아파트?._text || '',
                  년: data[i].년?._text || 0,
                  월: data[i].월?._text || 0,
                  일: data[i].일?._text || 0,
                  일련번호: data[i].일련번호?._text || 0,
                  전용면적: data[i].전용면적?._text || 0,
                  지번: data[i].지번?._text || 0,
                  지역코드: data[i].지역코드?._text || 0,
                  층: data[i].층?._text || 0,
                };
                arr.push(info);
              }
            }
          }
          Apartment.bulkCreate(arr);
        }
      });
    }
  }
};
