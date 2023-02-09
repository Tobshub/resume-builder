import jsPDF from "jspdf";
import { useEffect, useMemo, useRef, useState } from "react";
import { PreviewStructure } from "../types/preview-types";
import themes from "./themes";
import csx from "../../utils/csx";

type BuilderPreviewProps = {
  resume: PreviewStructure | undefined;
  theme: typeof themes.default;
};

// render build preview with react
export default function BuilderPreview({ resume, theme }: BuilderPreviewProps) {
  return (
    <div
      style={{
        width: 300,
        border: "1px solid black",
        aspectRatio: 1 / 1.41,
        backgroundColor: theme.general.background,
        color: theme.general.color,
        padding: `${theme.general.start.y}px ${theme.general.start.x}px`,
        textAlign: "left",
      }}
    >
      <BuilderPreviewHeader theme={theme.header} resume={resume} />
      <section
        style={{
          display: "flex",
          flexDirection: theme.body.flexStyle,
          gap: "5%",
          padding: `${theme.body.start.y}px ${theme.body.start.x}px`,
        }}
      >
        <BuilderPreviewSide theme={theme.body} resume={resume} />
        <BuilderPreviewMain theme={theme.body} resume={resume} />
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
        color: props.theme.color,
        width: "100%",
        height: "20%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "1rem",
        padding: "0 .5rem",
        border: `1px solid ${props.theme.highlights}`,
        marginBottom: props.theme.font?.large,
      }}
    >
      {props.resume?.image ? (
        <img
          src={props.resume.image}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : null}
      <div>
        <h1
          style={{
            fontSize: props.theme.font?.large,
            marginBottom: 0,
            marginTop: props.theme.font?.small,
          }}
        >
          {
            props.resume?.header.props.children.find(
              (field) => field.props.name === "First Name"
            )?.props.content
          }{" "}
          {
            props.resume?.header.props.children.find(
              (field) => field.props.name === "Last Name"
            )?.props.content
          }
        </h1>
        <p
          style={{
            fontSize: props.theme.font?.small,
          }}
        >
          {
            props.resume?.header.props.children.find(
              (field) => field.props.name === "Wanted Position"
            )?.props.content
          }
        </p>
      </div>
    </header>
  );
}

function BuilderPreviewMain(props: {
  theme: BuilderPreviewProps["theme"]["body"];
  resume: BuilderPreviewProps["resume"];
}) {
  return (
    <main
      style={{
        width: "65%",
      }}
    >
      {props.resume?.main.map((section) => (
        <div key={section.id}>
          <h2
            style={{
              fontSize: props.theme.font?.large,
              padding: `0 ${props.theme.font?.small}`,
              borderBottom: `1px solid ${props.theme.highlights}`,
            }}
          >
            {section.props.title}
          </h2>
          {section.props.children.map((item) => (
            <div
              key={item.id}
              style={{
                margin: ".2rem 0",
                padding: `0 ${props.theme.font?.large}`,
              }}
            >
              <h3
                style={{
                  fontSize: props.theme.font?.small,
                  margin: 0,
                }}
              >
                {item.props.name}
              </h3>
              <p style={{ margin: 0 }}>{item.props.content}</p>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}

function BuilderPreviewSide(props: {
  theme: BuilderPreviewProps["theme"]["body"];
  resume: BuilderPreviewProps["resume"];
}) {
  return (
    <article style={{ width: "30%", display: "flex", flexDirection: "column" }}>
      {props.resume?.side.map((section) => (
        <div key={section.id}>
          <h2
            style={{
              fontSize: props.theme.font?.large,
              padding: `0 ${props.theme.font?.small}`,
              borderBottom: `1px solid ${props.theme.highlights}`,
            }}
          >
            {section.props.title}
          </h2>
          {section.props.children.map((item) => (
            <div
              key={item.id}
              style={{
                margin: ".2rem 0",
                padding: `0 ${props.theme.font?.large}`,
              }}
            >
              <h3
                style={{
                  fontSize: props.theme.font?.small,
                  margin: 0,
                }}
              >
                {item.props.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: props.theme.font?.small,
                  width: "75%",
                }}
              >
                {item.props.content}
              </p>
            </div>
          ))}
        </div>
      ))}
    </article>
  );
}
