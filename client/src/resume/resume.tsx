import { useNavigate } from "react-router-dom";
import csx from "../utils/csx";
import trpc from "../utils/trpc";

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
            onClick={() => navigate("/builder/new")}
          >
            Create New
          </button>
        </div>
        {resumes.isLoading ? (
          <>Loading...</>
        ) : (
          resumes.data?.ok &&
          resumes.data.data.resumes.map((resume) => (
            <div key={resume.id}>{resume.content.title}</div>
          ))
        )}
      </main>
    </div>
  );
}
