import { Link } from "gatsby";
import React from "react";
import Lolly from "../components/Lolly";
import "../styles/main.css";

const Home = () => {
  return (
    <div>
      <div className="lolliesList">
        <Lolly lollyTop="#fa4234" lollyBottom="#e6194c" lollyMiddle="#00a3a6" />
        <Lolly lollyTop="#651bde" lollyBottom="#21ed87" lollyMiddle="#00a3a6" />
        <Lolly lollyTop="#fa4234" lollyBottom="#e6194c" lollyMiddle="#651bde" />
      </div>
      <Link to="/createLolly" className="btn">
        Send a vartual lolly gift to your near ones.
      </Link>
    </div>
  );
};

export default Home;