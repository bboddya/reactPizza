FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY package.json /app
RUN npm i 
COPY . /app
RUN npm run build

FROM nginx
COPY --from=builder /app/build /app
COPY /nginx /etc/nginx/conf.d/