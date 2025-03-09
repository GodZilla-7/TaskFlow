import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Todo from './components/todo.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import {Toaster} from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center"/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
