FROM node:12
RUN mkdir /code
WORKDIR /code
COPY package*.json /code/
RUN npm install
COPY . /code/