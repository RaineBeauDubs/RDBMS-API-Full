const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res
        .status(200)
        .json(cohorts)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

router.get('/:id', (req, res) => {
  db('cohorts')
    .where({
      id: req.params.id
    })
    .first()
    .then(cohort => {
      res
        .status(200)
        .json(cohort)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

router.post('/', (req, res) => {
  db('cohorts')
    .insert(req.body)
    .then(([id]) => {

      db('cohorts')
        .where({ id })
        .first()
        .then(cohort => {
          res
            .status(200)
            .json(cohort);
        })
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    })
});

router.put('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(response => {
      if(response > 0) {
        db('cohorts')
          .where({ id: req.params.id })
          .first()
          .then(response => {
            res
              .status(200)
              .json(response)
          })
      } else {
        res
          .status(404)
          .json({ message: 'Cohort not found' })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db('cohorts')
    .where({ id })
    .del()
    .then(count => {
      if(count > 0) {
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .json({ message: 'What is this cohort you speak of?' })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

module.exports = router;