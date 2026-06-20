import express from "express";

const router = express.Router();

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("User route working");
});

// REGISTER
router.post("/register", (req, res) => {
  res.send("Register API working");
});

// LOGIN
router.post("/login", (req, res) => {
  res.send("Login API working");
});

export default router;