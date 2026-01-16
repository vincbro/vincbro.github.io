import { classModule, h, init, propsModule, type VNode } from "snabbdom";
import {
  about,
  about_side,
  contact,
  footer,
  header,
  line,
  selected_work,
} from "./elements.ts";

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
        "w-full": true,
        "h-full": true,
        "bg-background": true,
        "text-foreground": true,
      },
    },
    [
      header("Vincent Brodin", "I build software", "vincbro"),
      line(),
      about(
        [
          h("span", [
            "I’m a student in system development who enjoys building efficient tools and libraries to solve practical problems. Recently, I’ve been focused on public transit systems, specifically developing a high-performance routing engine called blaise.",
          ]),
          h("span", [
            "I generally prefer working with languages like Rust and Go because they allow me to prioritize execution speed and memory efficiency. Most of my projects start as a way to smooth out friction in my own daily workflow, such as automating window placement or managing monitor configurations. I try to keep my tools lightweight and straightforward, aiming for software that stays out of the way while providing fast, reliable performance through efficient logic and parallel processing.",
          ]),
        ],

        [
          about_side("LANGUAGES", "Rust, C, Zig, Go, .NET, C#"),
          about_side("TOOLS", "Docker, Cargo, Nix/Flakes, Nginx"),
          about_side(
            "DOMAINS",
            "Public transit routing infrastructure, Linux desktop automation, and high-performance developer libraries.",
          ),
        ],
      ),
      line(),
      await selected_work([
        "vincbro/blaise",
        "vincbro/nest",
        "vincbro/suddig",
        "vincbro/csv",
      ]),
      line(),
      contact(),
      line(),
      footer(),
    ],
  );

window.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  if (app) {
    vnode = patch(app, await view());
    render();
  }
});
