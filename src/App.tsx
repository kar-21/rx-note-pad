import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import LandingPage from "./pages/LandingPage/LandingPage";
import SavedNotes from "./pages/SavedNotesPage/SavedNotesPage";
import NavigationHeader from "./templates/NavigationHeader";
import LoginPage from "./pages/LoginPage/LoginPage";
import TokenPage from "./pages/TokenPage/TokenPage";
import NewNotePage from "./pages/NewNotePage/NewNotePage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense>
          <NavigationHeader />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/saved" element={<SavedNotes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new" element={<NewNotePage />} />
            <Route path="/token/:token" element={<TokenPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
