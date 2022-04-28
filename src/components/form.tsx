import * as React from "react";

const data: FormField[] = [
  {
    id: "name",
    title: "Name",
    type: "text"
  },
  {
    id: "uteid",
    title: "UT EID",
    type: "text"
  },
  {
    id: "class",
    title: "Class",
    type: "dropdown",
    options: [
      "2022",
      "2023",
      "2024",
      "2025",
      "2026"
    ]
  },
  {
    id: "email",
    title: "Email",
    type: "email"
  },

];

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

const Form = () => {
  return (
    <form>
      {data.map((fieldData) => <Field key={fieldData.id} fieldData={fieldData} />)}
      <div className={"buttons"}>
        <input type={"submit"} />
        <input type={"reset"} value={"Clear"} />
      </div>
    </form>
  )
};

export default Form;