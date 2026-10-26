const express = require('express');
const {handleGenerateNewShortURL, handleGetAnaytics,handleGetShortURL} =  require('../controllers/url.controllers');
const router = express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnaytics);
router.get("/:shortId", handleGetShortURL);

module.exports = router;