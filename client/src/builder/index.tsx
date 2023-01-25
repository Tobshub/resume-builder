import { useState } from "react";
import BuilderForm from "./form/form";
import PDFPreview from "./preview/pdf";
import { BuilderFormSection } from "./types/form-types";

export default function BuilderPage() {
  // TODO: store resume data server-side for persistence
  const [resume, setResume] = useState<BuilderFormSection[]>([]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="builder"
    >
      <section>
        <BuilderForm setResume={setResume} />
      </section>
      <section>
        <PDFPreview resume={resume} />
      </section>
    </div>
  );
}
