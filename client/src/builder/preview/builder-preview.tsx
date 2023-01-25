import jsPDF from "jspdf";
import { useEffect, useMemo, useRef, useState } from "react";
import { PreviewStructure } from "../types/preview-types";
import themes from "./themes";
import PlaceHolderSVG from "../../assets/images/tobs.jpg";

type BuilderPreviewProps = {
  resume: PreviewStructure | undefined;
  theme: typeof themes.default;
};

export default function BuilderPreview({
  resume,
  theme,
}: BuilderPreviewProps) {
  return (
    <div
      style={{
        width: 300,
        aspectRatio: 1 / 1.41,
        backgroundColor: theme.general.background,
        color: theme.general.text,
        padding: `${theme.general.start.y}px ${theme.general.start.x}px`,
      }}
    >
      <BuilderPreviewHeader theme={theme.header} resume={resume} />
      <section
        style={{
          display: "flex",
        }}
      >
        <article></article>
        <main></main>
      </section>
    </div>
  );
}

function BuilderPreviewHeader(props: {
  theme: BuilderPreviewProps["theme"]["header"];
  resume: BuilderPreviewProps["resume"];
}) {
  return (
    <header
      style={{
        background: props.theme.background,
        color: props.theme.text,
        width: "100%",
        height: "20%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "1rem",
        padding: "0 .5rem",
        border: `1px solid ${props.theme.highlights}`,
      }}
    >
      <img
        src={PlaceHolderSVG}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
      <div>
        <h1
          style={{
            fontSize: props.theme.font.large,
          }}
        >
          {
            props.resume?.header.props.children.find(
              field => field.props.name === "First Name"
            )?.props.content
          }{" "}
          {
            props.resume?.header.props.children.find(
              field => field.props.name === "Last Name"
            )?.props.content
          }
        </h1>
        <p
          style={{
            fontSize: props.theme.font.small,
          }}
        >
          {
            props.resume?.header.props.children.find(
              field => field.props.name === "Wanted Position"
            )?.props.content
          }
        </p>
      </div>
    </header>
  );
}
