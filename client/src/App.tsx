import { useState } from "react";
import BuilderForm from "./builder/form";
import PDFPreview from "./builder/preview/pdf";
import { BuilderField } from "./builder/types/field-types";

function App() {
  // TODO: store resume data server-side for persistence
  const [resume, setResume] = useState<BuilderField[]>([]);
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

export default App;

