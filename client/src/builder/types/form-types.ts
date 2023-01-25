import { BuilderField } from "./field-types";

export type BuilderFormSectionProps = {
  title: string;
  children: BuilderField[];
  groupType: "flat" | "list";
  defaultChildPosition: BuilderField["props"]["position"];
  isEditable?: boolean;
};

export class BuilderFormSection {
  id: string;
  constructor(public props: BuilderFormSectionProps) {
    this.id = crypto.randomUUID();
    this.props.isEditable = props.isEditable ?? false;
  }

  addChild(item: BuilderField) {
    this.props.children.push(item);
  }

  setTitle(newTitle: BuilderFormSectionProps["title"]) {
    this.props.title = newTitle;
  }
}
