FROM node:24-alpine AS build

RUN apk add --no-cache git
WORKDIR /hub

COPY package.json package-lock.json ./
COPY packages packages
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /hub/build /usr/share/nginx/html

EXPOSE 80
