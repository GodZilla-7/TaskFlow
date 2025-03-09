import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// CORS Configuration (Allow Credentials)
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // Update this for production
    credentials: true, // Required for cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

// Global Error Handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Server error";
  res.status(status).json({ message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
