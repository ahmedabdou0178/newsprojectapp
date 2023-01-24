const express = require ("express");
const { verifyToken } = require ("../controllers/auth.js");
const {subscribe, unsubscribe} = require('../controllers/user')
const router = express.Router();

router.patch('/subscribe/:sourceId',verifyToken,subscribe)
router.patch('/unsubscribe/:sourceId',verifyToken,unsubscribe)

module.exports = router;