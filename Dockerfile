FROM node:20.3.1-alpine

RUN apk --no-cache add curl

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN rm -rf node_modules && \
    npm i

COPY . .

CMD ["npm", "run", "dev"]
