const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route 
 */
router.get('/:id', async (req, res) => {
    try{
        const response = await fetch(
            `https://perenual.com/api/species/details/${req.params.id}?key=${process.env.API_KEY}`
        );
        const body = await response.json();
        console.log('Plant details response on server side', body)
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


