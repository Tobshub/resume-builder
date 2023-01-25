import { useMemo, useState } from "react";
import { BuilderFormSection } from "../types/form-types";
import { PreviewStructure } from "../types/preview-types";

export default function useResumeState(builder: BuilderFormSection[]) {
  const [header] = useState<PreviewStructure["header"]>(() => {
    const section = builder.find(
      section => section.props.defaultChildPosition === "header"
    );
    if (!section) {
      throw new Error(
        "Builder Error: Resume Shape Must Always have a header section"
      );
    }
    return section;
  });

  const [main] = useState<PreviewStructure["main"]>(() => {
    const section = builder.filter(
      section => section.props.defaultChildPosition === "main"
    );
    return section ?? [];
  });

  const [side] = useState<PreviewStructure["side"]>(() => {
    const section = builder.filter(
      section => section.props.defaultChildPosition === "side"
    );
    return section ?? [];
  });

  const resume = useMemo(
    () => new PreviewStructure(header, main, side),
    [builder]
  );

  return resume;
}
