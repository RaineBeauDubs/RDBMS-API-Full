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

module.exports = router;