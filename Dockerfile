FROM node:4-onbuild
WORKDIR /code
COPY app.js /code/app.js
COPY package.json /code/package.json
RUN npm install
CMD ["npm","start"]
