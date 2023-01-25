import { ChangeEvent } from "react";
import { BuilderField } from "./types/field-types";
import {
  BuilderFormSection,
  BuilderFormSectionProps,
} from "./types/form-types";

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
      <h2>{section.props.title}</h2>
      {section.props.children.map(item => (
        <label key={item.id}>
          <h3>{item.props.name}</h3>
          {item.props.type === "short" ? (
            <input
              value={item.props.content}
              onChange={e => localHandleChange(e, item)}
            />
          ) : (
            <textarea
              value={item.props.content}
              onChange={e => localHandleChange(e, item)}
            />
          )}
        </label>
      ))}
    </div>
  );
}
