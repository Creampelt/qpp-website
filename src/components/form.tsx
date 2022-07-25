import * as React from "react";

type FormProps = {
  data: FormField[],
  onSubmit: (data: FormState) => void
};

type FieldProps = {
  fieldData: FormField,
  value: string,
  setValue: (value: string) => void
};

type SelectProps = {
  title: string,
  options: string[],
  value: string,
  setValue: (value: string) => void
};

const Select: React.FunctionComponent<SelectProps> = ({ title, options, value = "-1", setValue }) => (
  <div className={"select-container"}>
    <select onChange={(e) => setValue(e.target.value)}>
      <option key={"-1"} disabled={!!value} selected>{title.toLowerCase()}</option>
      {options.map((option) => <option selected={value === option} key={option}>{option}</option>)}
    </select>
    <span className={"dropdown-arrow"} />
  </div>
);

const Field: React.FunctionComponent<FieldProps> = ({ fieldData, value, setValue }) => {
  switch (fieldData.type) {
    case "text":
      return (
        <input
          type={"text"}
          placeholder={fieldData.title}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    case "email":
      // TODO: validate email input
      return (
        <input
          type={"email"}
          placeholder={fieldData.title}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
        />
      )
    case "dropdown":
      return <Select {...fieldData} value={value} setValue={setValue} />;
    default:
      return null;
  }
}

const Form: React.FunctionComponent<FormProps> = ({ data, onSubmit }) => {
  const [formData, setFormData] = React.useState<FormState>({});

  const setField = (key: string, value: string) => {
    setFormData((state) => ({ ...state, [key]: value }));
  };

  const submitForm: React.FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submitForm}>
      {data.map((fieldData) => (
        <Field
          fieldData={fieldData}
          key={fieldData.id}
          value={formData[fieldData.id]}
          setValue={(value) => setField(fieldData.id, value)}
        />
      ))}
      <div className={"buttons"}>
        <input type={"submit"}/>
        <input type={"reset"} value={"Clear"} />
      </div>
    </form>
  );
};

export default Form;