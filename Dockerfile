FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg

COPY server.js .

RUN npm install express

EXPOSE 3000

CMD ["node", "server.js"]
