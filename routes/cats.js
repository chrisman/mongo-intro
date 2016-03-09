var express = require('express');
var router = express.Router();
var Cats = require('../db/schemas/cats');

////////////
// CREATE //
////////////

router.get('/new', (req, res, next) => {
  res.render('cats/new', {title: 'new cat'});
});
router.post('/', (req, res, next) => {
  Cats.create(req.body, (err) => {
    res.redirect('/cats');
  })
});

//////////
// READ //
//////////

// get all //
router.get('/', (req, res, next) => {
  Cats.find().exec( (err, result) => {
    res.render('cats/index', {cats: result});
    //res.send(result);
  })
});
// get json //
router.get('/json', (req, res, next) => {
  Cats.find().lean().exec((err, users) => {
    res.send(JSON.stringify(users));
  });
});
// get one //
router.get('/:id', (req, res, next) => {
  Cats.find({ 
    '_id' : req.params.id 
  }).exec((err, result) => {
    res.render('cats/index', {cats: result});
  });
});

////////////
// UPDATE //
////////////
router.get('/:id/edit', (req, res, next) => {
  Cats.findOne({ 
    '_id' : req.params.id 
  }).exec((err, result) => {
    res.render('cats/edit', {cat: result});
  });
});
router.post('/:id', (req, res, next) => {
  Cats.findOneAndUpdate({
    '_id' : req.params.id
  },{
    'name' : req.body.name,
    'age' : req.body.age,
    'status' : req.body.status
  }).exec((err, result) => res.redirect(`/cats/${req.params.id}`));
});

////////////
// DELETE //
////////////
router.post('/:id/delete', (req, res, next) => {
  Cats.remove({
    '_id' : req.params.id
  }).exec(err => res.redirect('/cats'));
});



module.exports = router;
