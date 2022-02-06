FROM node:12.18.2 as build

WORKDIR /usr/src/app

COPY package.json .

RUN npm install
COPY . .

RUN npm run build

FROM nginx

EXPOSE 80

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
