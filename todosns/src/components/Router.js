import React, { memo } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = memo(({isLoggedIn}) => {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
});

export default AppRouter;