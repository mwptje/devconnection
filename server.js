const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect to mongodb
connectDB();

// init middleware, use for req.body parsing
app.use(express.json());

const PORT = process.env.PORT || 5000;
// test
app.get("/", (req, res) => res.send("API running"));

// Defin e routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
