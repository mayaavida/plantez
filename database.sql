
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR (80) NOT NULL,
  "last_name" VARCHAR (80) NOT NULL,
  "email" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "plants" (
	"id" SERIAL PRIMARY KEY,
	"nickname" VARCHAR (80) NOT NULL,
	"last_watered_date" DATE,
	"watering_interval" INT,
	"next_watering_date" DATE,
	"current_location" VARCHAR (1000),
	"notes" VARCHAR (1000),
	"image_url" VARCHAR (1000),
	"plant_api_id" integer NOT NULL,
	"user_id" integer REFERENCES "user"
);
