import "./App.css";
import store from "./stores/store";
import Home from "./routes/home";
import ToDoApp from "./routes/to-do-list";
import NavBar from "./components/NavBar";
import DisplayMap from "./routes/display-map";
import PDFTextGenerator from "./components/PDFRenderer";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return (
    <div id="root">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ToDo" element={<ToDoApp />} />
            <Route path="/Map" element={<DisplayMap />} />
            <Route path="/PDF" element={<PDFTextGenerator />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
