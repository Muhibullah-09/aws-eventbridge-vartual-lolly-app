import React, { FC } from "react";

type colorProps = {
  colorTop: string;
  setColorTop: React.Dispatch<React.SetStateAction<string>>;
  colorMiddle: string;
  setColorMiddle: React.Dispatch<React.SetStateAction<string>>;
  colorBottom: string;
  setColorBottom: React.Dispatch<React.SetStateAction<string>>;
};

const ColorPicker: FC<colorProps> = ({ colorTop, setColorTop, colorMiddle, setColorMiddle, colorBottom, setColorBottom }) => {
  return (
    <div className="colorPicker">
      <label htmlFor="colorTop" className="pickerLabel">
        <input
          className="setColor"
          type="color"
          value={colorTop}
          onChange={(e) => setColorTop(e.target.value)}
          name="colorTop"
          id="colorTop"
        />
      </label>

      <label htmlFor="colorMiddle" className="pickerLabel">
        <input
          className="setColor"
          type="color"
          value={colorMiddle}
          onChange={(e) => setColorMiddle(e.target.value)}
          name="colorMiddle"
          id="colorMiddle"
        />
      </label>
      <label htmlFor="colorMiddle" className="pickerLabel">
        <input
          className="setColor"
          type="color"
          value={colorBottom}
          onChange={(e) => setColorBottom(e.target.value)}
          name="colorBottom"
          id="colorBottom"
        />
      </label>
    </div>
  );
};

export default ColorPicker;