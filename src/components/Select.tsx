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
      onChange={(e) => setValue(e.target.value)}
    >
      <option key={"-1"} disabled selected={value === "-1"}>
        {title.toLowerCase()}
      </option>
      {options.map((option) => (
        <option selected={value === option} key={option}>
          {option}
        </option>
      ))}
    </select>
    <span className={"dropdown-arrow"} />
  </div>
);

export default Select;