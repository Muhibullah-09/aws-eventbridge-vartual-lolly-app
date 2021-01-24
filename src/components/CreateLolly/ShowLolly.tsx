import { Link } from "gatsby";
import React, { FC } from "react";

type Props = {
  recipient: string;
  message: string;
  sender: string;
  lollyPath: string;
  setSubmission: React.Dispatch<React.SetStateAction<boolean>>;
};

const LollyInfo: FC<Props> = ({
  recipient,
  message,
  sender,
  lollyPath,
  setSubmission,
}) => {
  return (
    <div className="info">
      <p className="share">Your lolly is freezing. Share it with this link: </p>
      <pre>{`https://master.d2h2x6jnb89ksl.amplifyapp.com/${lollyPath}`}</pre>
      <div className="details">
        <p id="recipient" className="recipient">
          {recipient}
        </p>
        <div id="message" className="message">
          {message}
        </div>
        <p id="from" className="from">
          — {sender}
        </p>
      </div>
      <p className="bytheway"> 
        {sender.toUpperCase()} made this virtual lollipop for you {recipient.toUpperCase()}
      </p><br/>
      <Link to="/createLolly" onClick={() => setSubmission(false)}>
          Create New Lolly
      </Link>{" "}
    </div>
  );
};

export default LollyInfo;