import "./builder.css";
import { lazy, useEffect, useMemo, useState, Suspense } from "react";
import useResumeState from "./hooks/resume-state";
import { BuilderFormSection } from "./types/form-types";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import themes from "./preview/themes";
import csx from "../utils/csx";
import { useLoaderData } from "react-router-dom";
// lazy load
const BuilderForm = lazy(() => import("./form/form"));
const BuilderPreview = lazy(() => import("./preview/builder-preview"));

/* TODO: 
  Store the resume content and image (as arrayBuffer) server side
*/
export default function BuilderPage() {
  const loaderData = useLoaderData() as { resumeId: string; theme: string };
  // store the resume data
  const [builderForm, setBuilderForm] = useState<BuilderFormSection[]>([]);
  const [userImage, setUserImage] = useState("");

  // store the resume structure
  const resume = useResumeState(builderForm, userImage);
  const pdf = useMemo(() => new jsPDF({ unit: "mm", compress: true }), []);
  const [theme] = useState<typeof themes.default>(themes[loaderData.theme]);

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
      className={csx(
        "builder d-flex",
        "justify-content-center align-items-center"
      )}
    >
      {/* TODO: create a blurry version of the form to use as the loader */}
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <BuilderForm
            setBuilderForm={setBuilderForm}
            setUserImage={setUserImage}
          />
        </section>
        <section>
          <BuilderPreview resume={resume} theme={theme} />
          <button onClick={renderPDF}>Generate PDF</button>
        </section>
      </Suspense>
    </div>
  );
}
