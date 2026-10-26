require("dotenv").config();
const express = require("express");
const cors = require("cors");
const urlRoute = require("./routes/url.routes");
const { connectToMongoDB } = require("./DB/dbConnection");
const URL = require("./models/url.models");

const app = express();
const dns = require("node:dns");

// Configure DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Load environment variables




// Allow requests from React frontend
app.use(cors({
  origin: "http://localhost:5173"
}));

// Connect to MongoDB
connectToMongoDB(process.env.MONGODB_URI)
.then(() => console.log("DB connected Successfully"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(express.json());

// URL generation route
app.use("/url", urlRoute);
app.use("/", urlRoute);




// Start server
const PORT = process.env.PORT || 8001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
