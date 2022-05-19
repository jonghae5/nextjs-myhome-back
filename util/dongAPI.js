const { Dong } = require('../models');

exports.dongAPI = async () => {
  const path = require('path');
  const fs = require('fs');
  var filePath = path.join(__dirname, '법정동코드.csv');
  var data = fs.readFileSync(filePath, { encoding: 'utf8' });
  var rows = data.split('\n');
  var result = [];
  for (var rowIndex in rows) {
    var row = rows[rowIndex].split(',');
    if (rowIndex === '0') {
      var columns = row;
    } else {
      var data = {}; // 빈 객체를 생성하고 여기에 데이터를 추가한다.

      for (var columnIndex in columns) {
        // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.

        var column = columns[columnIndex];

        data[column] = row[columnIndex];
      }

      result.push(data);
    }
  }
  console.log(result);
  await Dong.bulkCreate(result);
};
