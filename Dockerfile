FROM node:14.4.0-stretch-slim

ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json /usr/src/app/
COPY ./yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
