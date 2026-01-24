import { h } from "snabbdom";
import { markdown } from "./elements";
import { not_found_page } from "./notfound";

export const posts_page = async (file: string) => {
  console.log(file);
  try {
    const res = await fetch(`/posts/${file}.md`);
    const contentType = res.headers.get("content-type");
    if (!res.ok || (contentType && contentType.includes("text/html"))) {
      throw Error(`Could not find ${file}.md`);
    }
    const md = await res.text();
    console.log(md);
    return h(
      "div#app",
      {
        class: {
          "w-full": true,
          "py-8": true,
          "bg-background": true,
          "text-foreground": true,
          flex: true,
          "flex-col": true,
          "items-center": true,
        },
      },
      [markdown(md)],
    );
  } catch {
    return not_found_page();
  }
};
