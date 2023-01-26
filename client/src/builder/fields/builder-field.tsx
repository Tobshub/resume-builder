import { ChangeEvent, useEffect, useState } from "react";
import csx from "../../utils/csx";
import type { BuilderField } from "../types/field-types";
import { BuilderFormSection } from "../types/form-types";

type BuilderFieldProps = {
  sectionType: BuilderFormSection["props"]["groupType"];
  item: BuilderField;
  handleContentChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  handleNameChange(text: BuilderField["props"]["name"]): void;
};

export default function BuilderFieldForm({
  item,
  sectionType,
  handleContentChange,
  handleNameChange,
}: BuilderFieldProps) {
  return (
    <label className="builder-field">
      {sectionType === "flat" ? (
        <BuilderFieldFormHeadingComponent
          item={item}
          handleChange={handleNameChange}
        />
      ) : null}
      {item.props.type === "short" ? (
        <input
          className={csx("p-1")}
          type="text"
          placeholder={item.props.name}
          value={item.props.content}
          onChange={e => handleContentChange(e)}
        />
      ) : (
        <textarea
          className={csx("p-1")}
          style={{ resize: "none" }}
          value={item.props.content}
          onChange={e => handleContentChange(e)}
        />
      )}
    </label>
  );
}

function BuilderFieldFormHeadingComponent({
  item,
  handleChange,
}: {
  item: BuilderField;
  handleChange(text: BuilderField["props"]["name"]): void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameEdits, setNameEdits] = useState(item.props.name);

  if (isEditing) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          handleChange(nameEdits);
          setIsEditing(false);
        }}
      >
        <label>
          <input
            value={nameEdits}
            onChange={e => setNameEdits(e.target.value)}
            className={csx("form-control")}
          />
        </label>
        <button type="submit" className={csx("btn btn-outline-success")}>
          Confirm
        </button>
        <button
          className={csx("btn btn-outline-danger")}
          type="button"
          onClick={() => {
            setTimeout(() => {
              setIsEditing(false);
            }, 10);
          }}
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
      }}
    >
      <h3 className="font-3">{item.props.name}</h3>
      {item.props.isEditable ? (
        <button
          className={csx("btn", "btn-outline-secondary")}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      ) : null}
    </span>
  );
}
