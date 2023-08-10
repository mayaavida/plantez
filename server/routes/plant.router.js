const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//POST route
router.post('/add', (req, res) => {
    console.log('Request from AddPlant: ', req.body);
    const { nickname, plantId, userId, lastWateredDate, currentLocation, notes } = req.body;
    
    const queryText = 'INSERT INTO "plants"("nickname", "plant_api_id", "user_id", "last_watered_date", "current_location", "notes") VALUES ($1, $2, $3, $4, $5, $6);';
    pool.query(queryText, [nickname, plantId, userId, lastWateredDate, currentLocation, notes])
    .then(()=> res.sendStatus(200))
    .catch((err) => {
        console.log('Add plant failed: ', err);
        res.sendStatus(500);
    })
  });

//GET route
router.get('/user/:id', (req, res) => {
    const userId = req.params.id;;
    pool.query('SELECT * FROM "plants" WHERE "user_id" = $1', [userId])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/user/:id', error)
        res.sendStatus(500);
    });
})


  module.exports = router;