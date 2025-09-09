import React from "react";
import "./App.css";
import store from "./stores/store";
import Home from "./routes/home";
import ToDoApp from "./routes/to-do-list";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return (
    <div id="root">
      <Provider store={store}>
        <BrowserRouter>
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ToDo" element={<ToDoApp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
