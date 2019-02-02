const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.js');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celeb) => {
      res.render('celebrities', { celeb });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findOne({ _id: req.params.id })
    .then((celeb) => {
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
  newCelebrity.save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('celebrities/new');
    });
});

router.post('/celebrities/delete/:id/', (req, res, next) => {
  Celebrity.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
