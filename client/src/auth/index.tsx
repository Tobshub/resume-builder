import { useEffect, useState } from "react";
import trpc from "../utils/trpc";
import * as storage from "../lib/localstorage";
import csx from "../utils/csx";

export default function Login() {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const loginMut = trpc.user.login.useMutation({
    onSuccess(res, _, context) {
      console.log("data", res, "context", context);
      if (res.ok) {
        storage.set("token", res.data.token);
      }
    },
  });
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
          Login to use Resume Builder
        </p>

        <form>
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
              value={creds.email}
              onChange={({ target }) =>
                setCreds((state) => ({ ...state, email: target.value }))
              }
            />
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
              value={creds.password}
              onChange={({ target }) =>
                setCreds((state) => ({ ...state, password: target.value }))
              }
            />
          </label>

          <div className={csx("d-flex", "justify-content-between")}>
            <button
              className={csx("btn px-4 py-2", "btn-outline-secondary")}
              style={{ fontWeight: 700 }}
            >
              Cancel
            </button>
            <button
              className={csx("btn btn-primary px-4 py-2")}
              style={{ fontWeight: 700 }}
            >
              Login
            </button>
          </div>
        </form>
      </main>
      <button
        disabled={loginMut.isLoading}
        onClick={() => {
          loginMut.mutate({
            email: "test@gmail.com",
            password: "testing123",
          });
        }}
      >
        Login
      </button>
    </div>
  );
}
