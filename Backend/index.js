const express = require("express");
const cors = require("cors");
const urlRoute = require("./routes/url.routes");
const { connectToMongoDB } = require("./DB/dbConnection");
const URL = require("./models/url.models");

const app = express();


const PORT = 8001;

// Allow requests from React frontend
app.use(cors({
  origin: "http://localhost:5173"
}));

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/shortURL")
.then(() => console.log("DB connected Successfully"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(express.json());

// URL generation route
app.use("/url", urlRoute);
app.use("/", urlRoute);




// Start server
app.listen(PORT, () => {
console.log(`Server started at ${PORT}`);
});
