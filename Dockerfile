FROM node:14-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install react-scripts -g --silent
RUN npm ci
# --------------------------------------
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build
# --------------------------------------
FROM nginx:latest
EXPOSE 80
COPY --from=builder /app/build/ /var/www/html
COPY ./nginx/default.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]