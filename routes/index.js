var express = require('express');
var router = express.Router();

var db = require('../queries');
// var fieldList = ['wd15cd', 
// 				'category',
// 				'location_type',
// 				'longitude',
// 				'latitude',
// 				'street_name', 
// 				'street_id', 
// 				'location_subtype', 
// 				'outcome_category', 
// 				'outcome_date',
// 				'persistent_id', 
// 				'month', 
// 				'context', 
// 				'id'];
// console.log(fieldList);
// console.log('db is......');
// console.log(db.getAllWards);
router.get('/api/wards', db.getAllWards);
router.get('/api/wards/:id', db.getSingleWard);
router.get('/api/crime_stats', db.getQueryResults);
// router.get('/test', function(request, response) {
// 	var id = request.query.id;
// 	var name = request.query.name;
// 	var test = request.query.test;
// 	//var fieldList = ['a','test','c','name','e','id','g'];
// 	var whereClause = '';
// 	//response.end('Name: ' + name + '\nid: ' + id + '\nTest: ' + test);
// 	console.log(request.query);
// 	console.log(fieldList);
// 	fieldList.forEach(function(item,index,array){
// 		var whereValue = request['query'][item];
// 		// console.log(whereValue);
// 		if (whereClause != '' && !(typeof whereValue === 'undefined')){ //'undefined')){
// 			whereClause += ' AND ';
// 		};
// 		if (!(typeof whereValue === 'undefined')){
// 			whereClause += item + ' = ' + request['query'][item];
// 		};
// 		console.log(item + ': ' + request['query'][item]);
// 	});
// 	if (whereClause != '') {
// 		whereClause = ' WHERE ' + whereClause
// 	};
// 	console.log('whereClause: ' + whereClause);

// 	response.end(whereClause);
// });
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);


module.exports = router;