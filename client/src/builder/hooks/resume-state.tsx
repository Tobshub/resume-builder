import { useMemo, useState } from "react";
import { BuilderFormSection } from "../types/form-types";
import { PreviewStructure } from "../types/preview-types";

export default function useResumeState(
  builder: BuilderFormSection[],
  Image: string
) {
  const header = builder.find(
    section => section.props.defaultChildPosition === "HEADER"
  );

  // throw error if there isn't a header
  if (builder.length && !header) {
    throw new Error(
      "Builder Error: Resume Shape Must Always have a header section"
    );
  }

  const main =
    builder.filter(
      section =>
        section.props.defaultChildPosition === "MAIN" &&
        section.props.children
          .length /** only display sections with children */
    ) ?? [];

  const side =
    builder.filter(
      section =>
        section.props.defaultChildPosition === "SIDE" &&
        section.props.children
          .length /** only display sections with children */
    ) ?? [];

  const resume = useMemo(
    () =>
      header ? new PreviewStructure(header, main, side, Image) : undefined,
    [builder, Image]
  );

  return resume;
}

