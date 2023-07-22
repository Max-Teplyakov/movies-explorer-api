const router = require('express').Router();
const userRoutes = require('./users');
const filmRoutes = require('./movies');

router.use('/', userRoutes);
router.use('/', filmRoutes);

module.exports = router;
