const express = require("express");
const { getSources,getNews,getMostSubscribed } = require("../controllers/news.js");
const { verifyToken } = require("../controllers/auth.js");

const router = express.Router();

router.get("/sources", getSources);
router.get('/',verifyToken,getNews)
router.get('/top5',getMostSubscribed)

module.exports = router;
