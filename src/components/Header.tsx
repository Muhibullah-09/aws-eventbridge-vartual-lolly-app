import { Link } from "gatsby";
import React from "react";

const Header = () => {
  return (
    <header>
      <h1 className="title">
        <Link to="/">virtual lollipop</Link>
      </h1>
      <p className="subtitle">
        because we all know someone
        <br />
        who deserves some sugar.
      </p>
    </header>
  );
};

export default Header;