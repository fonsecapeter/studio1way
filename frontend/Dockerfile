FROM node:20.9.0 AS frontend-builder
COPY . /app
WORKDIR /app/frontend
RUN npm install
CMD ["npm", "run", "start-dev"]