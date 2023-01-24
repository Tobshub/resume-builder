export type BuilderField = FieldWithManyText | FieldWithText;

export type FieldWithTextProps = {
  title: string;
  content: string;
};

export class FieldWithText {
  id: string;
  type: "single_text";
  title: FieldWithTextProps["title"];
  content: FieldWithTextProps["content"];
  constructor(props: FieldWithTextProps) {
    this.id = crypto.randomUUID();
    this.type = "single_text";
    this.title = props.title;
    this.content = props.content;
  }
}

export type FieldWithManyTextProps = {
  title: string;
  content: { name: string; text: string }[];
};

export class FieldWithManyText {
  id: string;
  type: "many_text";
  title: FieldWithManyTextProps["title"];
  content: FieldWithManyTextProps["content"];
  constructor(props: FieldWithManyTextProps) {
    this.id = crypto.randomUUID();
    this.type = "many_text";
    this.title = props.title;
    this.content = props.content;
  }
}
