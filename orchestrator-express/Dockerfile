# based image yang akan digunakan
FROM node:18.14

ENV REDIS_URL=redis://default:NYFSqEeavwu3ZJE8G3Zov25BUqrm0JyZ@redis-10375.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:10375
ENV NODE_ENV=production
ENV APP_SERVER_URL=http://localhost:4002
ENV USER_SERVER_URL=http://localhost:4001
ENV PORT=4000

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /orchestrator-express

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]