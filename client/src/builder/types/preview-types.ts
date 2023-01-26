import { BuilderFormSection } from "./form-types";

export class PreviewStructure {
  constructor(
    readonly header: BuilderFormSection,
    readonly main: BuilderFormSection[],
    readonly side: BuilderFormSection[],
    readonly image?: string
  ) {}
}
