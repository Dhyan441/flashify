import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppLayout from "./components/AppLayout";
import Decks from "./components/Decks";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/app/*" element={<AppLayout />}>
            <Route path="decks" element={<Decks />} />
          </Route>
          <Route path="/login/*" element={<Login />}></Route>
        </Routes>
      </Router>
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
