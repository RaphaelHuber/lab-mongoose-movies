const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celeb) => {
      res.render('celebrities/index', { celeb });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/show/:id', (req, res, next) => {
  Celebrity.findOne({ _id: req.params.id })
    .then((celeb) => {
      console.log(celeb);
      res.render('celebrities/show', { celeb });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/new', (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchphrase });
  console.log('Made it');
  newCelebrity.save()
    .then((celeb) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/new');
    });
});

router.post('/delete/:id', (req, res, next) => {
  Celebrity.findByIdAndRemove({'_id': req.body.id})
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
