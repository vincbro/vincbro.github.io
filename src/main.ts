import { h } from "snabbdom";
import {
  about,
  about_side,
  contact,
  footer,
  header,
  line,
  selected_work,
} from "./elements.ts";

export const main_page = async () =>
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
            "I’m a systems development student with a focus on building high-performance tools and infrastructure. Most of my work involves finding ways to make software faster and more efficient.",
          ]),
          h("span", [
            "Currently, my main project is blaise, a high-performance routing engine for public transit data. I generally prefer working in environments where I have explicit control over memory and execution, as I find it easier to build reliable tools when I know exactly what the machine is doing under the hood.",
          ]),

          h("span", [
            "Outside of larger projects, I spend a lot of time building small tools to automate my own workflow, ranging from custom window management to monitor configurations. I aim to keep everything I build lightweight, fast, and out of the way.",
          ]),
        ],

        [
          about_side("LANGUAGES", "Rust, C, Zig, Go, .NET, C#"),
          about_side("TOOLS", "Docker, Cargo, Nix/Flakes, Nginx"),
          about_side(
            "DOMAINS",
            "Public transit routing infrastructure, web servers, and high-performance applications.",
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
