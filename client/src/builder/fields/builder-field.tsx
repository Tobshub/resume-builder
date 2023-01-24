import { ChangeEvent, useEffect } from "react";
import type { BuilderField } from "../types/field-types";

type BuilderFieldProps = BuilderField & {
  setContent: (content: BuilderField["content"]) => void;
};

export default function BuilderFieldForm(props: BuilderFieldProps) {
  const manyChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (props.type === "many_text") {
      const index = props.content.findIndex(item => item.name === name);
      if (index != undefined) {
        props.content[index] = { name, text: e.target.value };
        props.setContent(props.content);
      }
    }
  };
  return (
    <div>
      <h2>{props.title}</h2>
      {props.type === "many_text" ? (
        props.content.map(input => (
          <label key={input.name}>
            <span>{input.name}</span>
            <input
              value={input.text}
              onChange={e => manyChangeHandler(e, input.name)}
            />
          </label>
        ))
      ) : (
        <textarea
          value={props.content}
          onChange={e => props.setContent(e.target.value)}
        />
      )}
    </div>
  );
}
