import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumeSVG from "../assets/images/3-resumes.svg";
import csx from "../utils/csx";
import trpc from "../utils/trpc";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className={csx("d-flex page", "align-items-center")}
      style={{
        gap: "3.5rem",
        backgroundColor: "#6699ff12",
      }}
    >
      <img
        src={ResumeSVG}
        style={{
          maxHeight: "650px",
          objectFit: "contain",
        }}
      />
      <div style={{ maxWidth: 500 }}>
        <h1
          className="display-5"
          style={{
            fontWeight: 700,
          }}
        >
          Build professional Resumes now!
        </h1>
        <p className="fs-6" style={{ lineBreak: "loose", fontWeight: 500 }}>
          Save time with our easy to use resume builder. No formatting
          difficulties or stress. Rapidly make the perfect, job-winning resume
          to make your recruiter fall in love.
        </p>
        <div
          className={csx("d-flex w-100", "justify-center align-items-center")}
        >
          <button
            className={csx("btn btn-primary px-4 py-2")}
            style={{ fontWeight: 700 }}
            onClick={() => navigate("/builder")}
          >
            Create My Resume
          </button>
        </div>
      </div>
    </div>
  );
}
