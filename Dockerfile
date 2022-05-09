FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# docker build -t sellsy-app .
# docker run --name sellsy-app --rm -p 3000:3000 -v "/var/www/sellsy/docker-app/app":/app -v /app/node_modules -it sellsy-app