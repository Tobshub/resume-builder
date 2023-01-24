import { ChangeEvent } from "react";

type ListFieldProps = {
  title: string;
  content: string[];
  setContent: (newContent: string[]) => void;
};

export default function ListField(props: ListFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    props.content[key] = e.target.value;
    props.setContent(props.content);
  };

  const addItem = () => {
    props.setContent([...props.content, ""]);
  };

  return (
    <ul>
      <h2>{props.title}</h2>
      {props.content.map((item, key) => (
        <input
          key={key}
          value={item}
          onChange={e => handleChange(e, key)}
        />
      ))}
      <button onClick={addItem}>Add item</button>
    </ul>
  );
}
