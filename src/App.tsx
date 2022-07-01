import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SavedNotes from "./pages/SavedNotesPage/SavedNotesPage";
import NavigationHeader from "./templates/NavigationHeader";
import LoginPage from "./pages/LoginPage/LoginPage";
import TokenPage from "./pages/TokenPage/TokenPage";

const App = () => {

  return (
    <BrowserRouter>
      <Suspense>
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/saved" element={<SavedNotes />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/token/:token" element={<TokenPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
