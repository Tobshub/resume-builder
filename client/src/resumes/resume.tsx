import { Outlet, useNavigate } from "react-router-dom";
import csx from "../utils/csx";
import trpc from "../utils/trpc";
import themes from "../builder/preview/themes";
import { useState } from "react";

export default function Resumes() {
  const navigate = useNavigate();
  const resumes = trpc.resume.getAll.useQuery(undefined, {
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.error(err);
    },
  });

  return (
    <div className="page">
      <header></header>
      <main
        style={{
          margin: "0 auto",
          maxWidth: "75%",
        }}
      >
        <div
          className={csx(
            "d-flex",
            "justify-content-between align-items-center"
          )}
          style={{ borderBottom: "1px solid gold" }}
        >
          <h1
            className="display-6 "
            style={{
              fontWeight: 700,
            }}
          >
            Resumes
          </h1>
          <button
            className={csx("btn", "btn-primary")}
            style={{ fontWeight: 500 }}
            onClick={() => navigate("new")}
          >
            Create New
          </button>
        </div>
        {resumes.isLoading ? (
          <>Loading...</>
        ) : resumes.data?.ok && resumes.data.data.resumes.length ? (
          resumes.data.data.resumes.map((resume) => (
            <div key={resume.id}>{resume.content.title}</div>
          ))
        ) : (
          <>Nothing to see here</>
        )}
        <Outlet />
      </main>
    </div>
  );
}

/*
  TODO: 
  new resume created on the server 
  onSuccess -> redirect to /builder/:resumeId
*/
export function NewResumeModal() {
  const [theme, setTheme] = useState("default");
  const navigate = useNavigate();

  return (
    <div className={csx("new-modal", "d-flex flex-column")}>
      <style>{`
          .new-modal {
            position: absolute;
            top: 50%; left: 50;
            translate: -50% -50%
          }
      `}</style>
      <h2>Select a theme</h2>
      <select onChange={(e) => setTheme(e.target.value)}>
        {Object.keys(themes).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button
        className={csx("btn", "btn-primary")}
        style={{ fontWeight: 500 }}
        onClick={() => navigate(`/builder/new?theme=${theme}`)}
      >
        Create New
      </button>
    </div>
  );
}
