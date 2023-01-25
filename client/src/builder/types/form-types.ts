import { BuilderField } from "./field-types";

export type BuilderFormSectionProps = {
  title: string;
  children: BuilderField[];
  groupType: "flat" | "list" | "not-groupped";
};

export class BuilderFormSection {
  id: string;
  constructor(public props: BuilderFormSectionProps) {
    this.id = crypto.randomUUID();
  }

  addChild(item: BuilderField) {
    this.props.children.push(item);
  }
}
