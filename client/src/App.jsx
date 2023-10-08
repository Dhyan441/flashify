import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppLayout from "./components/AppLayout";
import Decks from "./components/Decks";
import Upload from "./components/smaller_components/Upload";

import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/app/*" element={<AppLayout />}>
            <Route path="decks" element={<Decks />} />
            <Route path="upload" element={<Upload />} />
          </Route>

          <Route path="/login" element={<Login />} />
          {/*<Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </Router>
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
