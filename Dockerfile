FROM node:24-bookworm

WORKDIR /app

COPY package.json package-lock.json ./
RUN HUSKY=0 npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
