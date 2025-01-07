FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g concurrently nodemon pnpm

WORKDIR /app/frontendk
RUN pnpm install

WORKDIR /app/backend
RUN pnpm install

EXPOSE 3000
EXPOSE 5173

WORKDIR /app

CMD ["concurrently", "cd frontend && pnpm run dev --host", "cd backend && pnpm run dev"]