'use strict';

import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.locals.title = 'Express';
  res.render('index');
});

export default router;