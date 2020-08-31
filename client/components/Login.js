import clsx from "clsx";
import cogoToast from "cogo-toast";

import feathers_client from "../utils/feathers_client";

function Login() {
  const [prompt, setPrompt] = React.useState("login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = () => {
    let post_data = {
      username: username,
      password: password,
    };
    if (prompt === "register") {
      feathers_client
        .service("users")
        .create(post_data)
        .then((r) => {
          if (r.success) {
            cogoToast.success(r.message);
          } else {
            cogoToast.error(r.message);
          }
        });
    } else if (prompt === "login") {
      feathers_client
        .service("login")
        .create(post_data)
        .then((r) => {
          if (!r.success) {
            cogoToast.error(r.message);
          } else {
            localStorage.setItem("heartsLoginToken", r.token);
            cogoToast.success(r.message);
          }
        });
    }
  };

  return (
    <>
      <div className="w-64 bg-white">
        <div>
          <button
            className={clsx(
              "border-r border-black w-1/2 py-2 focus:outline-none",
              prompt === "login" && "border-l border-t font-bold",
              prompt === "register" && "border-b text-opacity-50"
            )}
            onClick={() => setPrompt("login")}
          >
            Sign In
          </button>
          <button
            className={clsx(
              "border-black w-1/2 py-2 focus:outline-none",
              prompt === "register" && "border-t border-r font-bold",
              prompt === "login" && "border-b"
            )}
            onClick={() => setPrompt("register")}
          >
            Sign Up
          </button>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Username"
            className="border w-full px-4 py-2 bg-gray-200 focus:outline-none focus:bg-white"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border w-full px-4 py-2 bg-gray-200 focus:outline-none focus:bg-white mt-4"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="capitalize w-full rounded bg-blue-500 font-bold text-white py-2 focus:outline-none"
          onClick={submit}
        >
          {prompt}
        </button>
      </div>
    </>
  );
}

export default Login;
