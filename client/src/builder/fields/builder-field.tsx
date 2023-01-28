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
  deleteSelf(): void;
};

export default function BuilderFieldForm({
  item,
  sectionType,
  handleContentChange,
  handleNameChange,
  deleteSelf,
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
          type="text"
          placeholder={item.props.name}
          value={item.props.content}
          onChange={e => handleContentChange(e)}
        />
      ) : (
        <textarea
          style={{ resize: "none" }}
          value={item.props.content}
          onChange={e => handleContentChange(e)}
        />
      )}
      {item.props.isEditable ? (
        <button
          className={csx("btn", "btn-outline-danger")}
          onClick={deleteSelf}
        >
          Delete
        </button>
      ) : null}
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

  // render in edit mode
  if (isEditing) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          handleChange(nameEdits);
          // exit edit mode
          setIsEditing(false);
        }}
        className={csx(
          "d-flex",
          "justify-content-start align-items-center"
        )}
        style={{ gap: "1rem" }}
      >
        <label>
          <input
            value={nameEdits}
            onChange={e => setNameEdits(e.target.value)}
          />
        </label>
        <button type="submit" className={csx("btn btn-outline-success")}>
          Confirm
        </button>
        <button
          className={csx("btn btn-outline-danger")}
          type="button"
          onClick={() => {
            // exit edit mode after slight timeout
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
        gap: ".75rem",
      }}
    >
      <h3 className="fs-5">{item.props.name}</h3>
      {item.props.isEditable ? (
        <button
          className={csx("btn", "btn-outline-secondary")}
          onClick={() => setIsEditing(true) /** enter edit mode */}
        >
          Edit
        </button>
      ) : null}
    </span>
  );
}
