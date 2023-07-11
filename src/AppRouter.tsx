import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login/*" element={<Login />} />
          <Route path="/oauth/callback/:provider" element={<Auth />} /> 
          <Route path="/main" element={<Main />} /> 
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRouter;