import jsPDF from "jspdf";
import { useEffect, useMemo, useRef, useState } from "react";
import { BuilderField } from "../types/field-types";

type PDFPreviewprops = {
  resume: BuilderField[];
};

export default function PDFPreview(props: PDFPreviewprops) {
  const pdf = useMemo(() => {
    return new jsPDF();
  }, []);
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  const renderSection = (section: BuilderField[]) => {
    let start = 20;
    section.forEach((x, y) => {
      if (x.type === "single_text") {
        pdf.text(`${x.title}: `, 10, start);
        pdf.text(`${x.content} `, 10, start + 8);
        start += 20 + (x.content.length % 10);
      } else if (x.type === "many_text") {
        pdf.text(`${x.title}: `, 10, start);
        x.content.forEach((value, z) => {
          pdf.text(value.name + ": ", 10, start + (z + 1) * 15);
          pdf.text(value.text, 10, start + (z + 1) * 15 + 8);
        });
        start += 20 + Math.floor(x.content.length / 10);
      }
    });
  };

  useEffect(() => {
    if (props.resume) {
      console.log("loading preview...");

      renderSection(props.resume);
    }
  }, [props.resume]);

  // output the pdf to the iframe
  useEffect(() => {
    if (previewRef.current) {
      const out = pdf.output("datauristring", {});
      previewRef.current.src = out;
    }
  }, [previewRef]);

  return (
    <iframe
      className="pdf-preview"
      seamless={true}
      height="450px"
      ref={previewRef}
    ></iframe>
  );
}
