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
            "Currently, my main project is Blaise, a routing engine for public transit data (GTFS). Working on Blaise is really fun and getting to to squeeze every single drop of performance out the routing engine has been a real challange but one that has been extremly educational. Some of my major breakthroughs include moving from A* to RAPTOR which allows for non blocking paralelism, replacing hash maps with array lookups (both are O(n) but array lookup is just ptr+n*item_size vs a hash alogrithm) for the in-memory database, and eliminating heap allocations in inner loops by using preallocated buffers.",
          ]),

          h("span", [
            "Outside of larger projects, I spend a lot of time building small tools to automate my own workflow, ranging from custom window management to monitor configurations. One of my goals is to have as little friction in my day to day development, and to fufil that goal i like to build tools/applications that can automate that part of my workflow.",
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
