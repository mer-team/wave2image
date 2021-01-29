FROM nikolaik/python-nodejs:python3.6-nodejs14-alpine

RUN apk add --update --no-cache curl make g++ pangomm-dev libjpeg-turbo-dev

ARG HOST=localhost
ARG USER=guest
ARG PASS=guest
ARG PORT=5672
ARG MNG_PORT=15672
ARG TIME=10

COPY ./src /wave2image

WORKDIR /wave2image

CMD mkdir Audios
CMD mkdir Soundwaves

RUN npm install

RUN chmod +x ./wait-for-rabbit.sh

ENTRYPOINT ["./wait-for-rabbit.sh", "node", "index"]