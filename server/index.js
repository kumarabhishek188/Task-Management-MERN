// index.js
require("dotenv").config();          // always load .env

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ——— Inline CORS policy middleware ———
function corsPolicy(req, res, next) {
  const allowedOrigin = process.env.FRONTEND_URL;
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
}

// JWT auth middleware
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];        // "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];   // "<token>"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ——— Middleware ———
app.use(corsPolicy);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ——— DB Connection ———
const dbURI = process.env.DATABASE_URL;
if (!dbURI) {
  console.error("❌  Missing DATABASE_URL in your .env");
  process.exit(1);
}

mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("✅  Connected to MongoDB at", dbURI);
  })
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1);
  });

// ——— Routes ———
app.get("/", (req, res) => res.send("Backend is running"));

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const tasksRouter = require("./routes/tasks");
app.use("/api", authenticateToken, tasksRouter);

// Example protected test route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ msg: `Hello ${req.user.username}, this is a protected resource.` });
});

// ——— Start Server ———
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀  Server listening on port ${port}`);
});
