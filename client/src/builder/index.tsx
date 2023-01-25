import { useEffect, useMemo, useState } from "react";
import BuilderForm from "./form/form";
import useResumeState from "./hooks/resume-state";
import BuilderPreview from "./preview/builder-preview";
import { BuilderFormSection } from "./types/form-types";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import themes from "./preview/themes";

export default function BuilderPage() {
  // TODO: store resume data server-side for persistence
  const [builderForm, setBuilderForm] = useState<BuilderFormSection[]>([]);
  const resume = useResumeState(builderForm);
  const pdf = useMemo(() => new jsPDF({ unit: "mm", compress: true }), []);
  const [theme] = useState(themes.default);

  const renderPDF = async () => {
    const html = renderToString(
      <BuilderPreview resume={resume} theme={theme} />
    );
    await pdf
      .html(html, {
        width: 210 /** a4 paper widht in mm */,
        windowWidth: 300 /** preview width in px */,
      })
      .outputPdf("dataurlnewwindow");
  };

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
        <BuilderForm setBuilderForm={setBuilderForm} />
      </section>
      <section>
        <BuilderPreview resume={resume} theme={theme} />
        <button onClick={renderPDF}>Generate PDF</button>
      </section>
    </div>
  );
}
