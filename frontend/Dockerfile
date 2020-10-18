FROM node:12
RUN mkdir /code
WORKDIR /code
COPY package*.json /code/
RUN npm install
COPY . /code/
RUN npm install -g serve --sav
CMD ["npx", "serve", "-s", "build", "-l", "3000"]