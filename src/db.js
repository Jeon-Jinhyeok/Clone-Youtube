import mongoose from "mongoose";

const mongodb = require("mongoose");
mongodb.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
