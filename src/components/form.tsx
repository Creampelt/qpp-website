import * as React from "react";
import loader from "../images/loader.svg";

const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

type FormProps = {
  formName: string,
  data: FormField[]
};

type FieldProps = {
  fieldData: FormField,
  value: string,
  setValue: (value: string) => void
};

type SelectProps = {
  id: string,
  title: string,
  options: string[],
  value: string,
  setValue: (value: string) => void
};

const Select: React.FunctionComponent<SelectProps> = ({ id, title, options, value = "-1", setValue }) => (
  <div className={"select-container"}>
    <select name={id} onChange={(e) => setValue(e.target.value)}>
      <option key={"-1"} disabled selected={value === "-1"}>{title.toLowerCase()}</option>
      {options.map((option) => <option selected={value === option} key={option}>{option}</option>)}
    </select>
    <span className={"dropdown-arrow"} />
  </div>
);

const Field: React.FunctionComponent<FieldProps> = ({ fieldData, value, setValue }) => {
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
}

const Form: React.FunctionComponent<FormProps> = ({ formName, data }) => {
  const [formData, setFormData] = React.useState<FormState>({});
  const [errorMessage, setErrorMessage] = React.useState<string|null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const encode = (data: FormState) => (
    Object.keys(data)
      .map((key) => (
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )).join("&")
  );

  const submitForm: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": formName, ...formData })
        });
        alert("Thanks! Your request has been submitted.");
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      name={formName}
      method={"post"}
      data-netlify={"true"}
      data-netlify-honeypot={"bot-field"}
      onSubmit={submitForm}
      onReset={() => setFormData({})}
      noValidate
    >
      <input type={"hidden"} name={"form-name"} value={formName} />
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
        {errorMessage && (
          <p className={"error"}>
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;