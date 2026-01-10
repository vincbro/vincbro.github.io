import { classModule, h, init, propsModule, type VNode } from "snabbdom";
import {
  about,
  about_side,
  contact,
  header,
  line,
  selected_work,
} from "./elements";

const patch = init([classModule, propsModule]);
let vnode: VNode;

async function render() {
  vnode = patch(vnode, await view());
}
const view = async () =>
  h(
    "div#app",
    {
      class: {
        "min-w-screen": true,
        "min-h-screen": true,
        "bg-background": true,
        "text-foreground": true,
      },
    },
    [
      header("Vincent Brodin", "about me", "vincbro"),
      line(),
      about("About me here", [about_side("LANGS", "Rust, C, C++")]),
      line(),
      await selected_work([
        "vincbro/blaise",
        "vincbro/nest",
        "vincbro/suddig",
        "vincbro/csv",
      ]),
      line(),
      contact(),
    ],
  );

window.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  if (app) {
    vnode = patch(app, await view());
    render();
  }
});
