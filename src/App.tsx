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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Home />
                </>
              }
            />
            <Route
              path="/ToDo"
              element={
                <>
                  <NavBar />
                  <ToDoApp />
                </>
              }
            />
            <Route
              path="/Map"
              element={
                <>
                  <NavBar />
                  <DisplayMap />
                </>
              }
            />
            <Route path="/PDF" element={<PDFTextGenerator />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
