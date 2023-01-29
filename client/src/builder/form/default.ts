import { FieldWithText } from "../types/field-types";
import { BuilderFormSection } from "../types/form-types";

const defaultFormSections = [
  new BuilderFormSection({
    title: "TL;DR",
    groupType: "FLAT",
    defaultChildPosition: "HEADER",
    children: [
      new FieldWithText({
        name: "First Name",
        type: "SHORT",
        content: "",
      }),
      new FieldWithText({
        name: "Last Name",
        type: "SHORT",
        content: "",
      }),
      new FieldWithText({
        name: "Wanted Position",
        type: "SHORT",
        content: "",
      }),
    ],
  }),
  new BuilderFormSection({
    title: "Personal",
    defaultChildPosition: "SIDE",
    groupType: "FLAT",
    children: [
      new FieldWithText({
        name: "Email",
        type: "SHORT",
        content: "",
      }),
      new FieldWithText({
        name: "Phone No.",
        type: "SHORT",
        content: "",
      }),
      new FieldWithText({
        name: "State/Country",
        type: "SHORT",
        content: "",
      }),
    ],
  }),
  new BuilderFormSection({
    title: "About Me",
    defaultChildPosition: "MAIN",
    groupType: "LIST",
    isEditable: false,
    children: [
      new FieldWithText({
        name: "",
        content: "",
        type: "LONG",
      }),
    ],
  }),
  new BuilderFormSection({
    title: "Education",
    defaultChildPosition: "MAIN",
    groupType: "FLAT",
    isEditable: true,
    children: [],
  }),
  new BuilderFormSection({
    title: "Hobbies",
    defaultChildPosition: "SIDE",
    defaultChildType: "SHORT",
    groupType: "LIST",
    isEditable: true,
    children: [],
  }),
  new BuilderFormSection({
    title: "Skills",
    defaultChildPosition: "SIDE",
    defaultChildType: "SHORT",
    groupType: "LIST",
    isEditable: true,
    children: [],
  }),
];

export default defaultFormSections;

