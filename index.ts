// index.ts
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // If they ask for /styles.css, look at ./dist/styles.css
    let filePath = `./dist${path === "/" ? "/index.html" : path}`;
    let file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response(Bun.file("./dist/index.html"), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
