import express from "express";
const router = express.Router();
import {getTodos,createTodos,updateTodos,getTodoById,deleteTodoById } from "../controllers/todo.js";
import { verify } from "../utils/verify.js";

router.get("/",verify, getTodos);
router.post("/",verify, createTodos);
router.put("/:id",verify, updateTodos);
router.get("/:id",verify, getTodoById);
router.delete("/:id",verify, deleteTodoById);


export default router;
