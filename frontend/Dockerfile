FROM node:20.9.0 AS frontend-builder
ARG API_URL_ARL
ENV API_URL=${API_URL}
COPY . /app
WORKDIR /app/frontend
RUN npm install
RUN npm run build