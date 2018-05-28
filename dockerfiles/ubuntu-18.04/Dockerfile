FROM ubuntu:18.04
WORKDIR /app

ARG NODE_URL=https://deb.nodesource.com/setup_10.x

RUN apt-get update \
  && apt-get install -y curl gnupg \
  && curl -fsSL $NODE_URL | bash - \
  && apt-get install -y net-tools nodejs

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app

CMD ["npm", "test"]
