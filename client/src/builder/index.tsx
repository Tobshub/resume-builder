import "./builder.css";
import { lazy, useEffect, useMemo, useState, Suspense } from "react";
import useResumeState from "./hooks/resume-state";
import BuilderPreview from "./preview/builder-preview";
import { BuilderFormSection } from "./types/form-types";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import themes from "./preview/themes";
// lazy load
const BuilderForm = lazy(() => import("./form/form"));

export default function BuilderPage() {
  // TODO: store resume data server-side for persistence
  // store the resume data
  const [builderForm, setBuilderForm] = useState<BuilderFormSection[]>([]);
  const [userImage, setUserImage] = useState("");

  // store the resume structure
  const resume = useResumeState(builderForm, userImage);
  const pdf = useMemo(() => new jsPDF({ unit: "mm", compress: true }), []);
  const [theme] = useState<typeof themes.default>(themes.clean);

  // create the pdf out of the preview
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
        {/* TODO: create a blurry version of the form to use as the loader */}
        <Suspense fallback={<div>Loading...</div>}>
          <BuilderForm
            setBuilderForm={setBuilderForm}
            setUserImage={setUserImage}
          />
        </Suspense>
      </section>
      <section>
        <BuilderPreview resume={resume} theme={theme} />
        <button onClick={renderPDF}>Generate PDF</button>
      </section>
    </div>
  );
}
