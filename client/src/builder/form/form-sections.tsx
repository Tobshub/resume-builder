import { ChangeEvent, useState } from "react";
import BuilderFieldForm from "../fields/builder-field";
import { BuilderField, FieldWithText } from "../types/field-types";
import {
  BuilderFormSection,
  BuilderFormSectionProps,
} from "../types/form-types";

type BuilderFormSectionComponentProps = {
  section: BuilderFormSection;
  handleChange: (changedSection: BuilderFormSection) => void;
};

export default function BuilderFormSectionComponent({
  section,
  handleChange,
}: BuilderFormSectionComponentProps) {
  const localHandleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: BuilderField
  ) => {
    item.write(e.target.value);
    handleChange(section);
  };

  return (
    <div>
      <BuilderFormSectionComponentHeading
        section={section}
        handleChange={handleChange}
      />
      {section.props.children.map(item => (
        <BuilderFieldForm
          key={item.id}
          item={item}
          handleChange={e => localHandleChange(e, item)}
        />
      ))}
      <button
        onClick={() => {
          section.addChild(
            new FieldWithText({
              name: "Untitled",
              content: "",
              position: section.props.defaultChildPosition,
              type: "long",
              isEditable: true,
            })
          );
          handleChange(section);
        }}
      >
        +
      </button>
    </div>
  );
}

function BuilderFormSectionComponentHeading({
  section,
  handleChange,
}: {
  section: BuilderFormSection;
  handleChange: (changedSection: BuilderFormSection) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdits, setTitleEdits] = useState(section.props.title);

  if (isEditing) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          section.setTitle(titleEdits);
          handleChange(section);
          setIsEditing(false);
        }}
      >
        <input
          value={titleEdits}
          onChange={e => setTitleEdits(e.target.value)}
        />
        <button type="submit">Confirm</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    );
  }
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2>{section.props.title}</h2>
      {section.props.isEditable ? (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      ) : null}
    </span>
  );
}
