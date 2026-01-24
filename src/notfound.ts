import { h } from "snabbdom";
import { link } from "./elements";

export const not_found_page = () =>
  h(
    "div#app",
    {
      class: {
        "w-full": true,
        "h-screen": true,
        "bg-background": true,
        "text-foreground": true,
        flex: true,
        "flex-col": true,
        "items-center": true,
        "justify-center": true,
        "gap-4": true,
      },
    },
    [
      h(
        "h1",
        {
          class: { "text-8xl": true, "noto-bold": true },
        },
        ["404"],
      ),
      h(
        "p",
        {
          class: { "text-lg": true, "text-muted": true },
        },
        ["Can't find the page you are looking for :("],
      ),
      link("home", "/"),
    ],
  );
