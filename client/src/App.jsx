import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppLayout from "./components/AppLayout";
import Decks from "./components/Decks";
import Login from './components/Login';
import Study from "./components/Study";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/app/*" element={<AppLayout />}>
            <Route path="decks" element={<Decks />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/*<Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/study" element={<Study />} />
        </Routes>
      </Router>
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
