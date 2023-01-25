import { FieldWithText } from "./types/field-types";
import { BuilderFormSection } from "./types/form-types";

const defaultFormSections = [
  new BuilderFormSection({
    title: "Personal",
    groupType: "not-groupped",
    children: [
      new FieldWithText({
        name: "First Name",
        type: "short",
        content: "",
        position: "header",
      }),
      new FieldWithText({
        name: "Last Name",
        type: "short",
        content: "",
        position: "header",
      }),
      new FieldWithText({
        name: "Profile",
        type: "long",
        content: "",
        position: "main",
      }),
    ],
  }),
];

export default defaultFormSections;
