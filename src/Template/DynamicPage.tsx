import React from "react";
import Lolly from "../components/Lolly";
import "../styles/main.css";

const DynamicPage = ({ pageContext: { lolly } }) => {
  return (
    <div className="createLolly">
      <Lolly
        lollyTop={lolly.colorTop}
        lollyMiddle={lolly.colorMiddle}
        lollyBottom={lolly.colorBottom}
      />
      <div className="info">
        <div className="details">
          <p id="recipient" className="recipient">
            {lolly.recipient}
          </p>
          <div id="message" className="message">
            {lolly.message}
          </div>
          <p id="from" className="from">
            — {lolly.sender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;