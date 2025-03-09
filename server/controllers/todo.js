import { connecttoDB } from "../utils/connect.js";
import todoModel from "../models/todoModel.js";
import {createError} from "../utils/error.js";
export async function getTodos(req, res, next) {
    await connecttoDB();
    const todos = await todoModel.find({userID: req.user.id});
    res.status(200).json(todos);
}
export async function createTodos(req, res, next) {
    console.log(req.body);
    
    if (!req.body || !req.body.title) {
        return next(createError(400, "Please provide a title"));
    }

    await connecttoDB();

    try {
        const newTodo = await todoModel.create({
            title: req.body.title,
            userID: req.user.id
        });

        res.status(201).json({
            _id: newTodo._id, // Ensure the frontend gets the actual database ID
            title: newTodo.title,
            isDone: newTodo.isDone,
            userID: newTodo.userID
        });
    } catch (error) {
        next(error);
    }
}


export async function updateTodos(req, res,next) {
    const id =req.params.id;
    if(!req.body){return next(createError(400,"Missing feilds bad request!!!"))};

    try{
    await connecttoDB();
    const todo = await todoModel.findById(id);
    if(!todo){
        return next(createError(404,"Todo not found"));
    }
    if(todo.userID.toString() !== req.user.id){
        return next(createError(403,"Not allowed"));
    }
    todo.title = req.body.title||todo.title;
    if(req.body.isDone!==undefined){
        todo.isDone = req.body.isDone;
    }
    await todo.save();
    res.status(200).json(todo);
}
catch (error) {
    return next(createError(404,"Todo not found"));
}


}
export async function getTodoById(req, res ,next) {

   try{await connecttoDB();
    const todo = await todoModel.findById(req.params.id);
    if(!todo){
        return next(createError(404,"Todo not found"));
    }
    if(todo.userID.toString() !== req.user.id){
        return next(createError(403,"Not allowed"));
    }
    res.status(200).json(todo);}
     catch (error) {
        return next(createError(404,"Todo not found"));
    } 

}
export async function deleteTodoById(req, res, next) {
    try{await connecttoDB();
    const todo = await todoModel.deleteOne({_id:req.params.id,userID:req.user.id});
    if(!todo.deletedCount){
        return next(createError(404,"Todo not found"));
    }
    res.status(200).send("Todo deleted");
}
     catch (error) {
        return next(createError(404,"Todo not found"));
    } 

}
