var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/hodac_demo';
var db = pgp(connectionString);

function getAllWards(req, res, next) {
  db.any('select * from crime_stats')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Wards'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleWard(req, res, next) {
  var wardID = parseInt(req.params.id);
  db.one('select * from uk_wards where gid = $1', wardID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE ward'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getQueryResults(req, res, next) {
  // var fieldList = {wd15cd, category, location_type, longitude, latitude, street_name, 
  //      street_id, location_subtype, outcome_category, outcome_date, 
  //      persistent_id, month, context, id};
  
  // -------------- Code to create a where clause for a SQL SELECT Statement

  // var id = request.query.id;
  // var name = request.query.name;
  // var test = request.query.test;
  //var fieldList = ['a','test','c','name','e','id','g'];
  var fieldList = {'Place Name':'string', 
        'category':'string',
        'location_type':'string',
        'longitude':'real',
        'latitude':'real',
        'street-name':'string', 
        'street-id':'integer', 
        'location_subtype':'string', 
        'outcome-category':'string', 
        'outcome-date':'date',
        'persistent_id':'string', 
        'month':'date', 
        'context':'string', 
        'id':'integer'};

  var whereClause = '';
  var whereValue;// = '';
  var symbol;// = '';
  var dataType;// = '';
  // response.end('Name: ' + name + '\nid: ' + id + '\nTest: ' + test);
  console.log(req.query);
  // console.log(fieldList);

  for (field in fieldList){
    // console.log(field + " type: " + fieldList[field]);
    whereValue = req['query'][field];
    dataType = fieldList[field];
    // console.log(dataType);
    switch (dataType)
    {
      case 'string':
        symbol = "'";
        // console.log(field + ' type = string');
        break;
      case 'date':
        symbol = '#';
        // console.log(field + ' type = date - ' + symbol);
        break;
      default:
        // console.log(field + ' type = default')
       symbol = '';
    }
    // console.log('1-symbol: ' + symbol);
    // console.log('1-WhereValue: ' + whereValue);
    // console.log('1-whereClause: ' + whereClause);
    if (whereClause != '' && !(typeof whereValue === 'undefined')){ //'undefined')){
      whereClause += ' AND ';
    };
    // console.log('2-symbol: ' + symbol);
    console.log('2-WhereValue: ' + whereValue);
    // console.log('2-whereClause: ' + whereClause);
    if (!(typeof whereValue === 'undefined')){
      whereClause += '"' + field + '" = ' + symbol + decodeURIComponent(whereValue) + symbol;
    };
    // console.log('3-symbol: ' + symbol);
    // console.log('3-WhereValue: ' + whereValue);
    // console.log('3-whereClause: ' + whereClause);
    // console.log('Where Statement: ' + whereClause);
    // console.log(item + ': ' + req['query'][item]);
  
  }

  if (whereClause != '') {
    whereClause = ' WHERE ' + whereClause
  };
  // fieldList.forEach(function(item,index,array){
  //   var whereValue = req['query'][item];
  //   console.log(typeof whereValue);
  //   // console.log(whereValue);
  //   if (whereClause != '' && !(typeof whereValue === 'undefined')){ //'undefined')){
  //     whereClause += ' AND ';
  //   };
  //   if (!(typeof whereValue === 'undefined')){
  //     whereClause += item + ' = ' + req['query'][item];
  //   };
  //   // console.log(item + ': ' + req['query'][item]);
  // });
  // if (whereClause != '') {
  //   whereClause = ' WHERE ' + whereClause
  // };


  // console.log('whereClause: ' + whereClause);

  // response.end(whereClause);
  // // ----------------- end of Where Clause statement generation

  console.log('Query String: select * from crime_stats' + whereClause);
  // res = 'select * from crime_stats' + whereClause;
  db.any('select * from crime_stats' + whereClause)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Wards'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}




// function createPuppy(req, res, next) {
//   req.body.age = parseInt(req.body.age);
//   db.none('insert into pups(name, breed, age, sex)' +
//       'values(${name}, ${breed}, ${age}, ${sex})',
//     req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function updatePuppy(req, res, next) {
//   db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
//     [req.body.name, req.body.breed, parseInt(req.body.age),
//       req.body.sex, parseInt(req.params.id)])
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function removePuppy(req, res, next) {
//   var pupID = parseInt(req.params.id);
//   db.result('delete from pups where id = $1', pupID)
//     .then(function (result) {
//       /* jshint ignore:start */
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} puppy`
//         });
//       /* jshint ignore:end */
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }


module.exports = {
  getAllWards: getAllWards,
  getSingleWard: getSingleWard,
  getQueryResults: getQueryResults //,
  // createPuppy: createPuppy,
  // updatePuppy: updatePuppy,
  // removePuppy: removePuppy
};
