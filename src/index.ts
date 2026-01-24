import { classModule, init, propsModule, type VNode } from "snabbdom";
import { main_page } from "./main";
import { not_found_page } from "./notfound";
import { posts_page } from "./posts";

const patch = init([classModule, propsModule]);
let vnode: VNode;

async function render(path: string) {
  vnode = patch(vnode, await view(path));
}
const view = async (path: string) => {
  if (path.startsWith("/posts/")) {
    const parts = path.split("/").filter(Boolean);
    const file = parts[1] || "index";
    return await posts_page(file);
  }

  switch (path) {
    case "/":
      return await main_page();
    case "/posts":
      return await posts_page("index");
    default:
      return not_found_page();
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  if (app) {
    let current_path = window.location.pathname;
    console.log(current_path);
    vnode = patch(app, await view(current_path));
    render(current_path);
  }
});
