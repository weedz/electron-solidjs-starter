import { render } from "solid-js/web";

// @ts-expect-error
import { default as env } from "env";

function App() {
  console.log("Hello?", process.env.NODE_ENV, env);
  return <h1>Hello, world!</h1>
}

console.log(await globalThis.electronAPI.getVersions());

render(App, document.body);
