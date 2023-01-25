import { useState } from "react";
import type {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";
import { BuilderField, FieldWithText } from "./types/field-types";
import useStrictObjectArrayState from "./hooks/strict-state";
import {
  BuilderFormSection,
  BuilderFormSectionProps,
} from "./types/form-types";
import BuilderFormSectionComponent from "./form-sections";
import defaultFormSections from "./default";

type BuilderFormProps = {
  setResume: Dispatch<SetStateAction<BuilderField[]>>;
};

export default function BuilderForm(props: BuilderFormProps) {
  const [sections, setSections, pushSection] = useStrictObjectArrayState<
    BuilderFormSection[]
  >(defaultFormSections);

  const handleChange = (changedSection: BuilderFormSection) => {
    setSections(prevState => {
      const index = prevState.findIndex(
        section => section.id === changedSection.id
      );
      if (index != undefined) {
        prevState[index] = changedSection;
      }
      return [...prevState];
    });
  };

  const addSection = (props: BuilderFormSectionProps) => {
    pushSection(new BuilderFormSection(props));
  };

  return (
    <div>
      {sections.map(section => (
        <BuilderFormSectionComponent
          key={section.id}
          section={section}
          handleChange={handleChange}
        />
      ))}
      <button
        onClick={() =>
          addSection({
            title: "Untitled",
            groupType: "list",
            children: [
              new FieldWithText({
                content: "",
                name: "",
                type: "long",
                position: "main",
              }),
            ],
          })
        }
      >
        Add Section
      </button>
    </div>
  );
}
