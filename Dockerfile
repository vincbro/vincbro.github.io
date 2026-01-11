FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json ./
COPY bun.lock ./
COPY src ./

RUN bun install

RUN bun run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
