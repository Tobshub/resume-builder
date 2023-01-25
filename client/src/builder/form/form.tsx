import { Dispatch, SetStateAction, useEffect } from "react";
import { BuilderField } from "../types/field-types";
import useStrictObjectArrayState from "../hooks/strict-state";
import {
  BuilderFormSection,
  BuilderFormSectionProps,
} from "../types/form-types";
import BuilderFormSectionComponent from "./form-sections";
import defaultFormSections from "./default";

type BuilderFormProps = {
  setBuilderForm: Dispatch<SetStateAction<BuilderFormSection[]>>;
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

  const saveResume = () => {
    props.setBuilderForm(sections);
  };

  useEffect(() => {
    saveResume();
  }, []);

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
            defaultChildPosition: "main",
            children: [],
            isEditable: true,
          })
        }
      >
        Add Section
      </button>
      <button onClick={saveResume}>Save Resume</button>
    </div>
  );
}
