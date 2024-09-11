FROM node:20

LABEL maintainer = "仔仔 <373045134@qq.com>"

WORKDIR /

COPY package.json .

RUN yarn install --registry=https://registry.npmmirror.com

COPY . .

EXPOSE 3678

ENTRYPOINT ["npm", "run"]

CMD ["start"]