#FROM nikolaik/python-nodejs:python3.6-nodejs14-alpine
FROM debian:buster-slim
#RUN apk add --update --no-cache make curl gcc g++ alsa-lib-dev
#RUN apk add --update --no-cache alpine-sdk alsa-lib-dev 

RUN apt-get update && apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install python3 nodejs gcc g++ make libasound2-dev python-dev python-numpy python-setuptools libsndfile-dev -y  

#RUN ln -s /usr/include/alsa /alsa

ARG HOST=localhost
ARG USER=guest
ARG PASS=guest
ARG PORT=5672
ARG MNG_PORT=15672
ARG TIME=10

# install curl


COPY ./src /wave2image

WORKDIR /wave2image

CMD mkdir /Audios
CMD mkdir /Soundwaves

#RUN npm install -g node-gyp

RUN npm install

RUN chmod +x ./wait-for-rabbit.sh

CMD ["./wait-for-rabbit.sh", "node", "index"]