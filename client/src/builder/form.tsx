import { useState } from "react";
import type {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";
import type { BuilderField } from "./types/field-types";
import { FieldWithText, FieldWithManyText } from "./types/field-types";
import ListField from "./fields/list";
import TextField from "./fields/text";
import BuilderFieldForm from "./fields/builder-field";
import useStrictStateArray from "./hooks/strict-state";

type BuilderFormProps = {
  setResume: Dispatch<SetStateAction<BuilderField[]>>;
};

export default function BuilderForm(props: BuilderFormProps) {
  const [fields, setFields, pushField] = useStrictStateArray<
    BuilderField[]
  >([
    new FieldWithManyText({
      content: [
        {
          name: "First Name",
          text: "",
        },
        {
          name: "Last Name",
          text: "",
        },
      ],
      title: "Personal",
    }),
  ]);

  const addField = (
    type: BuilderField["type"],
    title: BuilderField["title"]
  ) => {
    switch (type) {
      case "many_text": {
        pushField(new FieldWithManyText({ content: [], title }));
        break;
      }
      case "single_text": {
        pushField(new FieldWithText({ content: "", title }));
        break;
      }
    }
  };

  const handleChange = (
    id: BuilderField["id"],
    content: BuilderField["content"]
  ) => {
    const index = fields.findIndex(field => field.id === id);
    fields[index].content = content;
    setFields([...fields]);
  };

  const handleSave = () => {
    props.setResume(fields);
  };

  return (
    <div>
      {fields.map(field => (
        <BuilderFieldForm
          key={field.id}
          {...field}
          setContent={content => handleChange(field.id, content)}
        />
      ))}
      <NewBuilderField handleSubmit={addField} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

function NewBuilderField({
  handleSubmit,
}: {
  handleSubmit: (
    type: BuilderField["type"],
    title: BuilderField["title"]
  ) => void;
}) {
  const [field, setField] = useState<{
    type: BuilderField["type"];
    title: BuilderField["title"];
  }>({
    title: "",
    type: "single_text",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setField(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const localHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(field.type, field.title.trim() || "Untitled");
  };

  return (
    <form onSubmit={localHandleSubmit}>
      <h2>New Field</h2>
      <label>
        <span>Title: </span>
        <input value={field.title} onChange={handleChange} name="title" />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
