export type BuilderField = FieldWithText;

export type FieldWithTextProps = {
  type: "short" | "long";
  name: string;
  content: string;
  position: "header" | "main" | "sidebar";
};

export class FieldWithText {
  id: string;
  constructor(public props: FieldWithTextProps) {
    this.id = crypto.randomUUID();
  }

  write(text: FieldWithTextProps["content"]) {
    this.props.content = text ?? "";
  }
}
