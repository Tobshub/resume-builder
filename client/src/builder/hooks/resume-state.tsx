import { useMemo, useState } from "react";
import { BuilderFormSection } from "../types/form-types";
import { PreviewStructure } from "../types/preview-types";

export default function useResumeState(
  builder: BuilderFormSection[],
  Image: string
) {
  const header = builder.find(
    section => section.props.defaultChildPosition === "header"
  );

  // throw error if there isn't a header
  if (builder.length && !header) {
    throw new Error(
      "Builder Error: Resume Shape Must Always have a header section"
    );
  }

  const main =
    builder.filter(
      section => section.props.defaultChildPosition === "main"
    ) ?? [];

  const side =
    builder.filter(
      section => section.props.defaultChildPosition === "side"
    ) ?? [];

  const resume = useMemo(
    () =>
      header ? new PreviewStructure(header, main, side, Image) : undefined,
    [builder, Image]
  );

  return resume;
}
