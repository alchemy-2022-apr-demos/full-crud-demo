const { Router } = require('express');
const { Soda } = require('../models/Soda');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Soda.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Soda.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Soda.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
