# React and Node
FROM node:12
WORKDIR /code
RUN mkdir /frontend
WORKDIR /code/frontend
COPY package*.json /code/frontend/
RUN npm install
RUN npm run dev