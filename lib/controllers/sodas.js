const { Router } = require('express');
const { Soda } = require('../models/Soda');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Soda.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
