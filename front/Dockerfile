FROM node:latest

#Creates directories
RUN mkdir -p /delarosa/front
#Sets an environment variable
ENV PORT 3001

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /delarosa/front

#Copy new files or directories into the filesystem of the container
COPY package.json /delarosa/front
COPY package-lock.json /delarosa/front

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /delarosa/front


#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run"]
