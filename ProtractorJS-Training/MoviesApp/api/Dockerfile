FROM node:10-alpine

RUN npm install -g json-server-auth
RUN rm -rf /root/.npm
RUN rm -rf /usr/lib/node_modules/npm

WORKDIR /data
COPY ./db.json /data/
EXPOSE 80

CMD ["json-server-auth", "db.json", "--host", "0.0.0.0" , "-p", "80"]