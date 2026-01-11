import { h, type VNode } from "snabbdom";

export const line = () =>
  h("hr", {
    class: { "w-full": true, "color-muted": true, "border-muted": true },
  });

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
          h(
            "p",
            { class: { "text-md": true, "text-muted": true, italic: true } },
            [role],
          ),
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
          },
        },
        [link("View Work", "#work"), link("Get in Touch", "#contact")],
      ),
    ],
  );

export const link = (text: string, url: string) =>
  h(
    "a",
    {
      props: { href: url },
      class: {
        "text-muted": true,
        "border-b": true,
        "border-muted": true,
        "hover:border-primary": true,
        "hover:text-primary": true,
        "ease-in-out": true,
        "transition-colors": true,
      },
    },
    [text],
  );

export const about = (body: VNode[], sides: VNode[]) =>
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
          class: {
            flex: true,
            "flex-row": true,
            "justify-between": true,
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
              h(
                "p",
                {
                  class: {
                    "text-lg": true,
                    "text-muted": true,
                    "max-w-1/2": true,
                    flex: true,
                    "flex-col": true,
                    "gap-4": true,
                  },
                },
                body,
              ),
            ],
          ),
          h(
            "div",
            {
              class: {
                flex: true,
                "flex-col": true,
                "gap-8": true,
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
  h("div", { class: { "w-full": true, "whitespace-nowrap": true } }, [
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
  const url = `https://api.github.com/repos/${short_url}`;
  let cache = localStorage.getItem(short_url);
  if (cache === null) {
    const res = await fetch(url);
    if (!res.ok) {
      return link(short_url, url);
    }
    const text = await res.text();
    cache = text;
  }

  console.log(cache);
  const data = JSON.parse(cache);

  return h("a", { props: { href: data.html_url }, class: { group: true } }, [
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
          h(
            "h3",
            {
              class: {
                "text-3xl": true,
                "group-hover:text-primary": true,
                "ease-in-out": true,
                "transition-colors": true,
              },
            },
            [data.name],
          ),
          h("p", { class: { "text-sm": true, "text-muted": true } }, [
            `${data.stargazers_count} stargazers`,
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
        [data.description],
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
          class: { flex: true, "flex-row": true, "gap-8": true },
        },
        [
          link("Mail", "mailto:vincent.brodin21@gmail.com"),
          link("Github", "https://github.com/vincbro"),
          link(
            "LinkedIn",
            "https://www.linkedin.com/in/vincent-brodin-820051242/",
          ),
        ],
      ),
    ],
  );

export const footer = () =>
  h(
    "footer#footer",
    {
      class: {
        flex: true,
        "flex-row": true,
        "justify-between": true,
        "my-8": true,
        "px-24": true,
      },
    },
    [
      h("p", { class: { "text-muted": true } }, ["© 2026 Vincent Brodin"]),
      h("p", { class: { "text-muted": true, italic: true } }, [
        "something cleaver",
      ]),
    ],
  );
