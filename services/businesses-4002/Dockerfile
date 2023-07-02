# based image yang akan digunakan
FROM node:18.14

ENV MONGODB=mongodb+srv://nafiirfanzidny:yQAc8taMBKVev0Vr@cluster0.qpwboif.mongodb.net
ENV NODE_ENV=production
ENV PORT=4002

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /businesses-4002

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]