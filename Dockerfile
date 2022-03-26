FROM node:latest

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install -g npm@6.14.11
RUN npm install -g react-scripts@3.4.1
CMD npm install ; \
    npm start

# WORKDIR /usr/src/app

# COPY ./package.json ./
# COPY tsconfig.json ./

# RUN npm install

# COPY . .

# CMD ["npm", "start"]