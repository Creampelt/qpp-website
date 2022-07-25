import * as React from "react";
import loader from "../images/loader.svg";

const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

type FormProps = {
  data: FormField[],
  isLoading: boolean,
  onSubmit: (data: FormState) => void,
  errorMessage: string | null,
  setErrorMessage: React.Dispatch<React.SetStateAction<string|null>>
  successMessage: string | null
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
      <option key={"-1"} disabled selected={value === "-1"}>{title.toLowerCase()}</option>
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

const Form: React.FunctionComponent<FormProps> = ({ data, isLoading, onSubmit, errorMessage, setErrorMessage, successMessage }) => {
  const [formData, setFormData] = React.useState<FormState>({});

  const setField = (key: string, value: string) => {
    setFormData((state) => ({ ...state, [key]: value }));
  };

  const validate = (): boolean => {
    for (const field of data) {
      const value = formData[field.id];
      if (!value || value.length === 0) {
        setErrorMessage("Please fill out all fields.");
        return false;
      }
      switch (field.type) {
        case "email":
          if (!value.match(EMAIL_REGEX)) {
            setErrorMessage("Please enter a valid email address.");
            return false;
          }
          break;
        case "dropdown":
          if (!field.options.includes(value)) {
            setErrorMessage("Please select a valid option from the dropdown menu.");
            return false;
          }
          break;
      }
    }
    return true;
  }

  const submitForm: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (validate())
      onSubmit(formData);
  };

  return (
    <form onSubmit={submitForm} noValidate onReset={() => setFormData({})}>
      {data.map((fieldData) => (
        <Field
          fieldData={fieldData}
          key={fieldData.id}
          value={formData[fieldData.id]}
          setValue={(value) => setField(fieldData.id, value)}
        />
      ))}
      <div className={"buttons"}>
        <button type={"submit"} className={`submit ${isLoading ? "loading" : ""}`}>
          <img className={"loader"} src={loader} alt={"Loading..."} />
          Submit
        </button>
        <input type={"reset"} value={"Clear"} />
        {(errorMessage || successMessage) && (
          <p className={`status ${errorMessage ? "error" : "success"}`}>
            {errorMessage || successMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;