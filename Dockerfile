FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN mkdir "prisma"

COPY ./prisma/schema.prisma /usr/src/app/prisma

#RUN npx prisma migrate dev --name init

EXPOSE 3000
CMD ["npm", "run", "dev" ]