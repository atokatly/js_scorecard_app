var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/scorecard');

router.get('/', function(req, res) {
    var collection = db.get('scores');
    collection.find({}, function(err, scores){
        if (err) throw err;
      	res.json(scores);
    });
});

router.post('/', function(req, res){
    var collection = db.get('scores');
    collection.insert({
        course: req.body.course,
        score: req.body.score,
        date: req.body.date
    }, function(err, score){
        if (err) throw err;

        res.json(score);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('scores');
    collection.findOne({ _id: req.params.id }, function(err, score){
        if (err) throw err;

      	res.json(score);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('scores');
    collection.update({
        _id: req.params.id
    },
    {
      course: req.body.course,
      score: req.body.score,
      date: req.body.date
    }, function(err, score){
        if (err) throw err;

        res.json(score);
    });
});

router.delete('/:id', function(req, res){
  var collection = db.get('scores');
  collection.remove({
    _id: req.params.id
  }, function(err, score){
     if (err) throw err;

     res.json(score);
  });
});

module.exports = router;
