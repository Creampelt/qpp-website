import * as React from "react";

type SelectProps = {
  id: string,
  title: string,
  options: string[],
  value: string,
  setValue: (value: string) => void
};

const Select: React.FunctionComponent<SelectProps> = ({
  id,
  title,
  options,
  value = "-1",
  setValue
}) => (
  <div className={"select-container"}>
    <select
      name={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value={"-1"} disabled>
        {title.toLowerCase()}
      </option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
    <span className={"dropdown-arrow"}/>
  </div>
);

export default Select;