import { FormEvent, useEffect, useState } from "react";
import trpc from "../utils/trpc";
import * as storage from "../lib/localstorage";
import csx from "../utils/csx";
import { Link, useNavigate } from "react-router-dom";
import { TRPCClientError } from "@trpc/client";
import useFormErrors from "./hooks/form-error";

export default function Login() {
  const [creds, setCreds] = useState({ email: "", password: "" });
  // handle form errors
  const [getErrorState, updateErrorState] = useFormErrors(
    { name: "email" as const, errorState: false },
    { name: "password" as const, errorState: false },
    { name: "general" as const, errorState: false }
  );
  const navigate = useNavigate();
  const loginMut = trpc.user.login.useMutation({
    onSuccess(res) {
      if (res.ok) {
        storage.set("token", res.data.token);
        navigate("/resumes");
      } else {
        updateErrorState("general", true);
      }
    },
    onError(error) {
      if (error instanceof TRPCClientError) {
        const message = JSON.parse(error.message) as { path: string[] }[];
        const invalidField = message[0].path[0];
        if (invalidField) {
          updateErrorState(invalidField as "email" | "password", true);
        }
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMut.mutate({ ...creds });
  };

  return (
    <div className="page">
      <style>{`
        input {
          width: 400px;
          font-size: 1.25rem;
          padding: 0.5rem 0.75rem;
          outline: none;
          color: black;
          background-color: hsla(0, 0%, 61%, 0.133);
          border: 0;
          border-radius: 5px;
          border-bottom: 1px solid;
          border-color: transparent;
          transition: border-color 300ms;
        }

        input:focus {
          border-color: gold;
        }

        button.btn {
          transition: background-color 300ms;
        }
      `}</style>
      <header></header>
      <main
        className={csx(
          "w-100 h-100",
          "d-flex flex-column",
          "justify-content-center align-items-center"
        )}
        style={{ gap: ".75rem", color: "#555" }}
      >
        <h1
          className="display-5 text-reset"
          style={{
            fontWeight: 700,
          }}
        >
          Log In
        </h1>
        <p className="fs-6 text-reset" style={{ fontWeight: 500 }}>
          Log In to use Resume Builder
        </p>
        {getErrorState("general")?.errorState ? (
          <span className={csx("fs-5 text-danger")}>
            Email or password is wrong
          </span>
        ) : null}

        <form onSubmit={handleSubmit}>
          <label
            className={csx(
              "d-flex flex-column text-reset mb-3",
              "justify-content-center align-items-start"
            )}
          >
            <span className="fs-6" style={{ fontWeight: 400 }}>
              Email
            </span>
            <input
              type="email"
              value={creds.email}
              onChange={({ target }) => {
                updateErrorState("email", false);
                updateErrorState("general", false);
                setCreds((state) => ({ ...state, email: target.value }));
              }}
            />
            {
              /** use email error state to show validation errors */
              getErrorState("email")?.errorState ? (
                <span className={csx("fs-6 text-danger")}>Invalid Email</span>
              ) : null
            }
          </label>

          <label
            className={csx(
              "d-flex flex-column text-reset mb-5",
              "justify-content-center align-items-start"
            )}
          >
            <span className="fs-6" style={{ fontWeight: 400 }}>
              Password
            </span>
            <input
              type="password"
              value={creds.password}
              onChange={({ target }) => {
                updateErrorState("password", false);
                updateErrorState("general", false);
                setCreds((state) => ({ ...state, password: target.value }));
              }}
            />
            {
              /** use password error state to show validation errors */
              getErrorState("password")?.errorState ? (
                <span className={csx("fs-6 text-danger")}>
                  Invalid Password Length
                </span>
              ) : null
            }
          </label>

          <div className={csx("d-flex mb-4", "justify-content-between")}>
            <button
              className={csx("btn px-4 py-2", "btn-outline-secondary")}
              style={{ fontWeight: 700 }}
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loginMut.isLoading}
              className={csx("btn btn-primary px-4 py-2")}
              style={{ fontWeight: 700 }}
            >
              Continue
            </button>
          </div>

          <div>
            <p>
              New user? <Link to={"../sign-up"}>Sign Up</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
