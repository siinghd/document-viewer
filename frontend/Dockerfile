FROM node:19-alpine as builder
WORKDIR /my-space

COPY package.json ./
RUN yarn install 
COPY . .
RUN yarn run build

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]