import { FieldWithText } from "../types/field-types";
import { BuilderFormSection } from "../types/form-types";

const defaultFormSections = [
  new BuilderFormSection({
    title: "Personal",
    groupType: "flat",
    defaultChildPosition: "header",
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
        name: "Wanted Position",
        type: "short",
        content: "",
        position: "header",
      }),
    ],
  }),
  new BuilderFormSection({
    title: "Education",
    defaultChildPosition: "main",
    groupType: "list",
    children: [],
  }),
];

export default defaultFormSections;
