# STEP-1 BUILD
# Defining node image and giving alias as node-helper
# It's better to define version otherwise me might face issue in future build

FROM node:18-alpine as node-helper

#Accepting build-arg to create environment specific build
#it is useful when we have multiple environment (e.g: dev, tst, staging, prod)
#default value is development
ARG build_env=development

#Creating virtual directory inside docker image
WORKDIR /app

RUN npm cache clean --force

#Copying file from local machine to virtual docker image directory
COPY package.json yarn.lock ./

#installing deps for project
RUN yarn install

#copying all files from local machine to virtual docker image directory
COPY . .

RUN npm run build -- --configuration=$build_env

#STEP-2 RUN
#Defining nginx img
FROM nginx:1.24-alpine as ngx

#copying compiled code from dist to nginx folder for serving
COPY --from=node-helper /app/dist/client /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

#exposing internal port
EXPOSE 80
