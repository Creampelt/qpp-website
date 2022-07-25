import * as React from "react";

type SelectProps = {
  title: string,
  options: string[]
}

const Select: React.FunctionComponent<SelectProps> = ({ title, options }) => (
  <div className={"select-container"}>
    <select>
      <option selected key={"-1"} disabled>{title.toLowerCase()}</option>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
    <span className={"dropdown-arrow"} />
  </div>
);

export default Select;