import React from "react";
import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function Layout() {
  const location = useLocation();

  const noAppNavigations = ["/medications/details", "/profil"];
  const showAppNavigation = !noAppNavigations.includes(location.pathname);
  return (
    <div className="container">
      <div className="panel">
        <Outlet />
      </div>
      {showAppNavigation && <AppNavigation />}
    </div>
  );
}
