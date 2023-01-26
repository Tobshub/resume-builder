import { FieldWithText } from "../types/field-types";
import { BuilderFormSection } from "../types/form-types";

const defaultFormSections = [
  new BuilderFormSection({
    title: "TL;DR",
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
    title: "Personal",
    defaultChildPosition: "side",
    groupType: "flat",
    children: [
      new FieldWithText({
        name: "Email",
        type: "short",
        content: "",
        position: "side",
      }),
      new FieldWithText({
        name: "Phone No.",
        type: "short",
        content: "",
        position: "side",
      }),
      new FieldWithText({
        name: "State/Country",
        type: "short",
        content: "",
        position: "side",
      }),
    ],
  }),
  new BuilderFormSection({
    title: "About Me",
    defaultChildPosition: "main",
    groupType: "flat",
    isEditable: false,
    children: [
      new FieldWithText({
        name: "",
        content: "",
        position: "main",
        type: "long",
      }),
    ],
  }),
  new BuilderFormSection({
    title: "Education",
    defaultChildPosition: "main",
    groupType: "flat",
    isEditable: true,
    children: [],
  }),
  new BuilderFormSection({
    title: "Hobbies",
    defaultChildPosition: "side",
    defaultChildType: "short",
    groupType: "list",
    isEditable: true,
    children: [],
  }),
];

export default defaultFormSections;
