export type BuilderField = FieldWithText;

export type FieldWithTextProps = {
  type: "short" | "long";
  name: string;
  content: string;
  isEditable?: boolean;
};

export class FieldWithText {
  id: string;
  constructor(public props: FieldWithTextProps) {
    this.id = crypto.randomUUID();
    this.props.isEditable = props.isEditable ?? false;
  }

  write(text: FieldWithTextProps["content"]) {
    this.props.content = text ?? "";
  }

  editName(text: FieldWithTextProps["name"]) {
    if (this.props.isEditable) {
      this.props.name = text;
    }
  }
}
