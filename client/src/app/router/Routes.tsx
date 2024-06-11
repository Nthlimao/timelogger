import React, { ReactElement } from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import ProtectedRoute from "./Protected";

import IndexPage from "../../pages/Index";
import LoginPage from "../../pages/Login";
import ProjectsPage from "../../pages/Projects";
import ProjectPage from "../../pages/Project";
import MainLayout from "../../components/MainLayout";

const Routes = (): ReactElement => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ReactRoutes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectPage />} />
                </ReactRoutes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
