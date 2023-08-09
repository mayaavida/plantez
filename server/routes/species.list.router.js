const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route 
 */
router.get('/', async (req, res) => {
    try{
        const response = await fetch(
            `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${req.query.q}`
        );
        const body = await response.json();
        res.send(body);
    } catch (error) {
        res.sendStatus(500);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;


