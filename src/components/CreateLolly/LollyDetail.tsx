import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";

type formInputs = {
  recipientName: string;
  message: string;
  sendersName: string;
};

type Props = {
  setRecipient: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSender: React.Dispatch<React.SetStateAction<string>>;
  setSubmission: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
};

const initialValues: formInputs = {
  recipientName: "",
  message: "",
  sendersName: "",
};

const validationSchema = Yup.object({
  recipientName: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
  sendersName: Yup.string().required("Required"),
});

const LollyDetail: FC<Props> = ({ setSender, setMessage, setRecipient, setSubmission, setLink }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: formInputs) => {
      setRecipient(values.recipientName);
      setMessage(values.message);
      setSender(values.sendersName);
      setLink(`${nanoid(10)}`);
      setSubmission(true);
    },
  });
  return (
    <div className="info">
      <form onSubmit={formik.handleSubmit}>
        <div className="details">
          <p>
            <label htmlFor="recipientName">To</label>{" "}
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              placeholder="A lolly for..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recipientName}
            />
            {formik.touched.recipientName && formik.errors.recipientName ? (
              <span className="error">{formik.errors.recipientName}</span>
            ) : null}
          </p>
          <div className="message">
            <label htmlFor="message">Message</label>{" "}
            <textarea
              name="message"
              id="message"
              cols={30}
              rows={10}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
              <span className="error">{formik.errors.message}</span>
            ) : null}
          </div>
          <p>
            <label htmlFor="sendersName">From</label>{" "}
            <input
              type="text"
              id="sendersName"
              name="sendersName"
              placeholder="From your friend..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sendersName}
            />
            {formik.touched.sendersName && formik.errors.sendersName ? (
              <span className="error">{formik.errors.sendersName}</span>
            ) : null}
          </p> 
        </div>
        <input type="submit" value="Freeze this lolly and get a link"></input>
      </form>
    </div>
  );
};

export default LollyDetail;