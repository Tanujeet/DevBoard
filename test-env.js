// test-env.js
require("dotenv").config({ path: "./.env.local" });
console.log("DATABASE_URL from .env.local:", process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  console.log("DATABASE_URL is loaded successfully!");
} else {
  console.log("DATABASE_URL is NOT loaded.");
}
