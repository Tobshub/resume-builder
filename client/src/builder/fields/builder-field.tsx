import { ChangeEvent, useEffect } from "react";
import type { BuilderField } from "../types/field-types";

type BuilderFieldProps = {
  item: BuilderField;
  handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
};

export default function BuilderFieldForm({
  item,
  handleChange,
}: BuilderFieldProps) {
  return (
    <label key={item.id}>
      <span
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h3>{item.props.name}</h3>
        {item.props.isEditable ? <button>Edit</button> : null}
      </span>
      {item.props.type === "short" ? (
        <input
          type="text"
          placeholder={item.props.name}
          value={item.props.content}
          onChange={e => handleChange(e)}
        />
      ) : (
        <textarea
          style={{ resize: "none" }}
          value={item.props.content}
          onChange={e => handleChange(e)}
        />
      )}
    </label>
  );
}
