FROM node:14-alpine

ARG HOST=localhost
ARG USER=guest
ARG PASS=guest
ARG PORT=5672
ARG MNG_PORT=15672
ARG TIME=10

COPY ./src /wave2image

WORKDIR /wave2image

RUN apk add --update --no-cache curl make g++ pangomm-dev libjpeg-turbo-dev && \
    mkdir /Audios && mkdir /Soundwaves && rm -rf /wave2image/test && \
    npm install && chmod +x ./wait-for-rabbit.sh

ENTRYPOINT ["./wait-for-rabbit.sh", "node", "index"]