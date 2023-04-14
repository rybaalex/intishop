FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
COPY . /app
RUN npm install
EXPOSE 5000
USER node
CMD ["npm", "run", "prod"]