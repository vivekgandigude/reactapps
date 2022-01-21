import React from "react";

import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <nav className="headerDiv">
      <Link to="/">Home</Link>
      <Link to="/employees">Employees(MySQL)</Link>
      <Link to="/sales">Sales Data(SharePoint)</Link>
    </nav>
  );
}
export default Header;
