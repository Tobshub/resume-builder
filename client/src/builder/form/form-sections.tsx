import { ChangeEvent, useState } from "react";
import csx from "../../utils/csx";
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
  // handle input text
  const localHandleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: BuilderField
  ) => {
    item.write(e.target.value);
    handleChange(section);
  };

  // handle changes to a field name
  const handleFieldNameChange = (
    text: BuilderField["props"]["name"],
    item: BuilderField
  ) => {
    item.editName(text);
    handleChange(section);
  };

  return (
    <div className="p-2">
      <BuilderFormSectionComponentHeading
        section={section}
        handleChange={handleChange}
      />
      <div className={csx("w-100 d-flex gap-3 flex-wrap")}>
        {section.props.children.map(item => (
          <BuilderFieldForm
            key={item.id}
            item={item}
            sectionType={section.props.groupType}
            handleContentChange={e => localHandleChange(e, item)}
            handleNameChange={(text: BuilderField["props"]["name"]) =>
              handleFieldNameChange(text, item)
            }
          />
        ))}
      </div>
      {section.props.isEditable ? (
        <button
          className={csx("btn btn-outline-secondary")}
          onClick={() => {
            section.addChild(
              new FieldWithText({
                name: section.props.groupType === "list" ? "" : "Untitled",
                content: "",
                position: section.props.defaultChildPosition,
                type: section.props.defaultChildType ?? "long",
                isEditable: true,
              })
            );
            handleChange(section);
          }}
        >
          +
        </button>
      ) : null}
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

  // render in edit mode
  if (isEditing) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          section.setTitle(titleEdits);
          handleChange(section);
          // exit edit mode
          setIsEditing(false);
        }}
      >
        <label>
          <input
            className={csx("form-control p-2")}
            value={titleEdits}
            onChange={e => setTitleEdits(e.target.value)}
          />
        </label>
        <button className={csx("btn btn-outline-success")} type="submit">
          Confirm
        </button>
        <button
          className={csx("btn btn-outline-danger")}
          type="button"
          onClick={() => setIsEditing(false)}
        >
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
      <h2 className={csx("display-6")}>{section.props.title}</h2>
      {section.props.isEditable ? (
        <button
          className={csx("btn btn-outline-warning")}
          onClick={() => setIsEditing(true) /** switch to edit mode */}
        >
          Edit
        </button>
      ) : null}
    </span>
  );
}
