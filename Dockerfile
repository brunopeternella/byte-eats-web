FROM node:18.20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod -- --base-href="/web/byte-eats/"

FROM nginx:1.27.1-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/web-byte-eats/browser /usr/share/nginx/html
