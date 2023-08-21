const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//POST route
router.post("/add", (req, res) => {
  console.log("Request from AddPlant: ", req.body);
  const {
    nickname,
    plantId,
    userId,
    lastWateredDate,
    wateringInterval,
    currentLocation,
    notes,
    imageUrl,
  } = req.body;

  const queryText = `INSERT INTO "plants"("nickname", "plant_api_id", "user_id", "last_watered_date", "watering_interval", "next_watering_date", "current_location", "notes", "image_url") VALUES ($1, $2, $3, $4, $5, $4::date + $5 * INTERVAL '1 day', $6, $7, $8);`;

  pool
    .query(queryText, [
      nickname,
      plantId,
      userId,
      lastWateredDate,
      wateringInterval,
      currentLocation,
      notes,
      imageUrl,
    ])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Add plant failed: ", err);
      res.sendStatus(500);
    });
});

//GET route
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  pool
    .query(
      `SELECT id, nickname, TO_CHAR(last_watered_date, 'dd/mm/yyyy') AS last_watered_date, watering_interval, TO_CHAR(next_watering_date, 'dd/mm/yyyy') AS next_watering_date, current_location, notes, image_url, plant_api_id, user_id FROM "plants" WHERE "user_id" = $1;`,
      [userId]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/user/:id", error);
      res.sendStatus(500);
    });
});

//DELETE route
router.delete("/delete/:id", (req, res) => {
  const plantId = req.params.id;
  console.log("This is the plantId on server side: ", plantId);
  pool
    .query('DELETE FROM "plants" WHERE "id" = $1', [plantId])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error deleting plant: ", err);
      res.sendStatus(500);
    });
});

//PUT route
router.put("/update/:id", (req, res) => {
  const plantId = req.params.id;
  const { nickname, location, wateredDate, wateringInterval, notes } = req.body;
  const queryText = `UPDATE "plants" SET "nickname" = $1, "current_location" = $2, "last_watered_date" = $3, "watering_interval" = $4, "next_watering_date" = $3::date + $4 * INTERVAL '1 day', "notes" = $5 WHERE "id" = $6;`;
  pool
    .query(queryText, [
      nickname,
      location,
      wateredDate,
      wateringInterval,
      notes,
      plantId,
    ])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error updating plant: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
