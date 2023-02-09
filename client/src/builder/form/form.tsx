import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useStrictObjectArrayState from "../hooks/strict-state";
import {
  BuilderFormSection,
  BuilderFormSectionProps,
} from "../types/form-types";
import BuilderFormSectionComponent from "./form-sections";
import defaultFormSections from "./default";
import csx from "../../utils/csx";

type BuilderFormProps = {
  setBuilderForm: Dispatch<SetStateAction<BuilderFormSection[]>>;
  setUserImage: Dispatch<SetStateAction<string>>;
};

// TODO: on the first load get the props from the server
export default function BuilderForm(props: BuilderFormProps) {
  // store the sections for the resume builder form
  const [sections, setSections, pushSection] =
    useStrictObjectArrayState<BuilderFormSection[]>(defaultFormSections);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (changedSection: BuilderFormSection) => {
    setSections((prevState) => {
      const index = prevState.findIndex(
        (section) => section.id === changedSection.id
      );
      if (index != undefined) {
        prevState[index] = changedSection;
      }
      return [...prevState];
    });
  };

  const saveResume = () => {
    props.setBuilderForm(sections);
    if (
      imageInputRef.current &&
      imageInputRef.current.files &&
      imageInputRef.current.files.length
    ) {
      const [file] = imageInputRef.current.files;
      // read file data and pass it as the img src
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => {
        if (fr.result) {
          props.setUserImage(fr.result?.toString());
        }
      };
    }
  };

  const addSection = (props: BuilderFormSectionProps) => {
    pushSection(new BuilderFormSection(props));
  };

  return (
    <div
      className={csx("w-100 builder-form")}
      style={{
        backgroundColor: "hsla(0, 0%, 69%, 30%)",
      }}
    >
      <style>{`
        button.btn {
          padding: .4rem .8rem;
          font-weight: 700;
        }
      `}</style>

      <input ref={imageInputRef} type="file" accept="image/*" />

      {sections.map((section) => (
        <BuilderFormSectionComponent
          key={section.id}
          section={section}
          handleChange={handleChange}
        />
      ))}
      <div className={csx("p-2 d-flex flex-row gap-4")}>
        <button
          className={csx("btn btn-outline-secondary")}
          onClick={() =>
            addSection({
              title: "Untitled",
              groupType: "FLAT",
              defaultChildPosition: "MAIN",
              children: [],
              isEditable: true,
            })
          }
        >
          Add Section
        </button>
        <button
          className={csx("btn btn-outline-secondary")}
          onClick={saveResume}
        >
          Save Resume
        </button>
      </div>
    </div>
  );
}
