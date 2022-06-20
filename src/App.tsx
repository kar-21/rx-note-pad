import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SavedNotes from "./pages/SavedNotes";
import NavigationHeader from "./templates/NavigationHeader";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/saved" element={<SavedNotes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
