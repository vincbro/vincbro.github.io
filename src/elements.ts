import { h, vnode, type VNode } from "snabbdom";

export const line = () => h("hr", { class: { "w-full": true } });

export const header = (name: string, about: string, role: string) =>
  h(
    "header#header",
    {
      class: {
        "min-h-screen": true,
        "w-full": true,
        flex: true,
        "flex-col": true,
        "justify-center": true,
        "px-24": true,
        "gap-12": true,
      },
    },
    [
      h(
        "div",
        {
          class: {
            flex: true,
            "flex-col": true,
            "gap-2": true,
          },
        },
        [
          h("p", { class: { "text-md": true, "text-muted": true } }, [role]),
          h("h1", { class: { "text-8xl": true, "noto-bold": true } }, [name]),
          h("p", { class: { "text-lg": true, "text-muted": true } }, [about]),
        ],
      ),
      h(
        "div",
        {
          class: {
            flex: true,
            "flex-row": true,
            "gap-4": true,
            "text-muted": true,
          },
        },
        [
          h(
            "a",
            {
              props: { href: "#work" },
              class: {
                "border-b": true,
                "border-muted": true,
                "hover:border-primary": true,
                "hover:text-primary": true,
                "transition-colors": true,
              },
            },
            ["View Work"],
          ),
          h(
            "a",
            {
              props: { href: "#contact" },
              class: {
                "border-b": true,
                "border-muted": true,
                "hover:border-primary": true,
                "hover:text-primary": true,
                "transition-colors": true,
              },
            },
            ["Get in Touch"],
          ),
        ],
      ),
    ],
  );

export const about = (body: string, sides: VNode[]) =>
  h(
    "section#about",
    {
      class: {
        "w-full": true,
        flex: true,
        "flex-col": true,
        "justify-center": true,
        "my-24": true,
        "px-24": true,
      },
    },
    [
      h("h2", { class: { "text-5xl": true, "mb-4": true } }, ["About"]),
      h(
        "div",
        {
          class: { flex: true, "flex-row": true, "justify-between": true },
        },
        [
          h(
            "div",
            {
              class: {
                flex: true,
                "flex-col": true,
                "gap-2": true,
                grow: true,
              },
            },
            [
              h("p", { class: { "text-lg": true, "text-muted": true } }, [
                body,
              ]),
            ],
          ),
          h(
            "div",
            {
              class: {
                flex: true,
                "flex-col": true,
                "gap-8": true,
                grow: true,
                "justify-between": true,
              },
            },
            sides,
          ),
        ],
      ),
    ],
  );

export const about_side = (title: string, text: string) =>
  h("div", [
    h("p", { class: { "mb-2": true, "text-muted": true } }, [title]),
    h("p", { class: {} }, [text]),
  ]);

export const selected_work = async (short_urls: string[]) => {
  let nodePromises: Promise<VNode>[] = short_urls.map((url) => work(url));
  const nodes: VNode[] = await Promise.all(nodePromises);

  return h(
    "section#work",
    {
      class: {
        "w-full": true,
        flex: true,
        "flex-col": true,
        "justify-center": true,
        "my-24": true,
        "px-24": true,
      },
    },
    [
      h("h2", { class: { "text-5xl": true, "mb-4": true } }, ["Selected Work"]),
      h(
        "div",
        {
          class: { flex: true, "flex-col": true, "gap-8": true },
        },
        nodes,
      ),
    ],
  );
};
const work = async (short_url: string) => {
  const res = await fetch(`https://api.github.com/repos/${short_url}`);
  const json = await res.json();
  console.log(json);
  return h("a", { props: { href: json.html_url } }, [
    h("div", { class: {} }, [
      h(
        "div",
        {
          class: {
            flex: true,
            "flex-row": true,
            "items-end": true,
            "gap-2": true,
          },
        },
        [
          h("h3", { class: { "text-3xl": true } }, [json.name]),
          h("p", { class: { "text-sm": true, "text-muted": true } }, [
            `${json.stargazers_count} stargazers`,
          ]),
        ],
      ),

      h(
        "p",
        {
          class: {
            "mt-2": true,
            "text-muted": true,
            "max-w-1/2": true,
          },
        },
        [json.description],
      ),
    ]),
  ]);
};

export const contact = () =>
  h(
    "section#contact",
    {
      class: {
        "w-full": true,
        flex: true,
        "flex-col": true,
        "justify-center": true,
        "my-24": true,
        "px-24": true,
      },
    },
    [
      h("h2", { class: { "text-5xl": true, "mb-4": true } }, ["Let's Talk"]),
      h(
        "div",
        {
          class: { flex: true, "flex-col": true, "gap-8": true },
        },
        ["test"],
      ),
    ],
  );
