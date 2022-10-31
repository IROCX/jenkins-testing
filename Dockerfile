#Base Image node:12.18.4-alpine
FROM node:18.9.0
#Set working directory to /app
WORKDIR /app
#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH
#Copy package.json in the image
COPY package.json /app

#Install Packages
RUN npm i

#Copy the app
COPY . /app

#Start the app
CMD node app.js

#Expose application port
EXPOSE 3000