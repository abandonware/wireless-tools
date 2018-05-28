FROM alpine:3.7
WORKDIR /app

RUN apk add -U nodejs

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app

CMD ["npm", "test"]
