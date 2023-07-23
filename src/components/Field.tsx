import * as React from "react";
import Select from "./Select";

type FormFieldProps = {
  fieldData: FormField,
  value: string,
  setValue: (value: string) => void
};

const Field: React.FunctionComponent<FormFieldProps> = ({
  fieldData,
  value,
  setValue
}) => {
  switch (fieldData.type) {
    case "text":
    case "email":
      return (
        <input
          type={fieldData.type}
          name={fieldData.id}
          placeholder={fieldData.title}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    case "dropdown":
      return <Select {...fieldData} value={value} setValue={setValue} />;
    default:
      return null;
  }
};

export default Field;