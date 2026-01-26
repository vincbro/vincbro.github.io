import { h } from "snabbdom";
import { footer, markdown } from "./elements";
import { not_found_page } from "./notfound";

export const posts_page = async (file: string) => {
  console.log(file);
  try {
    const res = await fetch(`/posts/${file}.md`);
    const contentType = res.headers.get("content-type");
    if (!res.ok || (contentType && contentType.includes("text/html"))) {
      throw Error(`Could not find ${file}.md`);
    }
    let md = await res.text();
    md = md.replace(/(\[.*?\]\()(.+?)\.md(\))/g, (_, prefix, path, suffix) => {
      let newPath = path;

      if (!path.startsWith("/") && !path.startsWith("http")) {
        const cleanPath = path.replace(/^\.\//, "");
        newPath = `/posts/${cleanPath}`;
      }
      return `${prefix}${newPath}${suffix}`;
    });
    console.log(md);
    return h(
      "div#app",
      {
        class: {
          "w-full": true,
          "min-h-screen": true,
          "py-8": true,
          "bg-background": true,
          "text-foreground": true,
          flex: true,
          "flex-col": true,
          "items-center": true,
          "justify-between": true,
        },
      },
      [markdown(md), footer()],
    );
  } catch {
    return not_found_page();
  }
};
