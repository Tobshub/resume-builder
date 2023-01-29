import { BuilderField } from "./field-types";

export type BuilderFormSectionProps = {
  title: string;
  children: BuilderField[];
  groupType: "FLAT" | "LIST";
  defaultChildPosition: "HEADER" | "MAIN" | "SIDE";
  defaultChildType?: BuilderField["props"]["type"];
  isEditable?: boolean;
};

export class BuilderFormSection {
  id: string;
  constructor(public props: BuilderFormSectionProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.props.isEditable = props.isEditable ?? false;
  }

  addChild(item: BuilderField) {
    this.props.children.push(item);
  }

  removeChild(item: BuilderField) {
    this.props.children = this.props.children.filter(
      child => child.id !== item.id
    );
  }

  setTitle(newTitle: BuilderFormSectionProps["title"]) {
    this.props.title = newTitle;
  }
}

