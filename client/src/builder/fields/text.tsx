import { useState } from "react";

type TextFieldProps = {
  title: string;
  content: string;
  setContent: (newContent: string) => void;
};

export default function TextField(props: TextFieldProps) {
  return (
    <label>
      <h2>{props.title}</h2>
      <input
        type="text"
        value={props.content}
        onChange={e => props.setContent(e.target.value)}
      />
    </label>
  );
}
