import * as React from "react";
import Field from "./Field";
import loader from "../images/loader.svg";
import { getFormError, encode } from "../utils/helpers";

type FormProps = {
  name: string,
  fields: FormField[]
};

const Form: React.FunctionComponent<FormProps> = ({ name, fields }) => {
  const [
    formState,
    setFormState
  ] = React.useState<Record<string, string>>({});
  const [
    errorMessage,
    setErrorMessage
  ] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const setField = (key: string, value: string) => {
    setFormState((formState) => ({
      ...formState,
      [key]: value
    }));
  };

  const validate = (): boolean => {
    const errorMessage = getFormError(fields, formState);
    setErrorMessage(errorMessage);
    return !errorMessage;
  }

  const resetForm: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    setFormState({});
  }

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": name, ...formState })
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
      name={name}
      method={"post"}
      fields-netlify={"true"}
      fields-netlify-honeypot={"bot-field"}
      onSubmit={submitForm}
      onReset={resetForm}
      noValidate
    >
      <input type={"hidden"} name={"form-name"} value={name} />
      {fields.map((fieldData) => (
        <Field
          fieldData={fieldData}
          key={fieldData.id}
          value={formState[fieldData.id]}
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