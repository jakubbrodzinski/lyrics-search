### STAGE 1: BUILD ###
FROM node:12.16.3 as builder

ENV WORK_PATH /usr/src/lyrics-search
ENV PROJECT_NAME lyrics-search

RUN mkdir -p ${WORK_PATH}
WORKDIR ${WORK_PATH}
COPY package*.json ${WORK_PATH}/
RUN npm install

COPY . ${WORK_PATH}

RUN npm run-script build --prod

### STAGE 2: DEPLOYABLE NGINX SERVER ###
FROM nginx:1.17.10

#Repetition from nginx Dockerfile
EXPOSE 80

RUN rm -rf /usr/share/nginx/html/*

#Cannot use ENV variables from 1 stage of build.
COPY --from=builder /usr/src/lyrics-search/dist/lyrics-search/ /usr/share/nginx/html/

#Configuration file. Should be reviewed/updated
COPY ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
