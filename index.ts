const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === "/") path = "/index.html";

    let file = Bun.file(`./dist${path}`);

    if (!(await file.exists()) && !path.includes(".")) {
      const htmlPath = `${path}.html`;
      const htmlFile = Bun.file(`./dist${htmlPath}`);
      if (await htmlFile.exists()) {
        file = htmlFile;
      }
    }

    if (!(await file.exists())) {
      file = Bun.file("./dist/index.html");
    }

    return new Response(file);
  },
});

console.log(`Server running at http://localhost:${server.port}`);
