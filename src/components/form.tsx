import * as React from "react";

type FormProps = {
  data: FormField[]
}

type FieldProps = {
  fieldData: FormField
}

const Field: React.FunctionComponent<FieldProps> = ({ fieldData }) => {
  switch (fieldData.type) {
    case "text":
      return <input type={"text"} placeholder={fieldData.title} />
    case "email":
      return <input type={"email"} placeholder={fieldData.title} />
    case "dropdown":
      return (
        <select defaultValue={"-1"}>
          <option key={"-1"} disabled>{fieldData.title.toLowerCase()}</option>
          {fieldData.options.map((option) => <option key={option}>{option}</option>)}
        </select>
      )
    default:
      return null;
  }
}

const Form: React.FunctionComponent<FormProps> = ({ data }) => (
  <form>
    {data.map((fieldData) => <Field fieldData={fieldData} key={fieldData.id} />)}
    <div className={"buttons"}>
      <input type={"submit"} />
      <input type={"reset"} value={"Clear"} />
    </div>
  </form>
);

export default Form;