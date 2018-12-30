FROM node:9.6.1

# Create app directory
RUN mkdir /usr/src/server
WORKDIR /usr/src/server

# add `/usr/src/server/node_modules/.bin` to $PATH
ENV PATH /usr/src/server/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/server/

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["npm", "run", "start"]