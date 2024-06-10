import React, { ReactElement } from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import ProtectedRoute from "./Protected";

import IndexPage from "../../pages/Index";
import LoginPage from "../../pages/Login";

const Routes = (): ReactElement => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
        />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
