import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyNotes from "./pages/MyNotesPage/MyNotesPage";
import NavigationHeader from "./templates/NavigationHeader/NavigationHeader";
import LoginPage from "./pages/LoginPage/LoginPage";
import TokenPage from "./pages/TokenPage/TokenPage";
import GetUserInfo from "./templates/GetUserInfo/GetUserInfo";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense>
          <NavigationHeader />
          <GetUserInfo />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/my-notes" element={<MyNotes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/token/:token" element={<TokenPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
