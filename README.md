# Backend Scaffold used to not have to do this everytime with new projects.

## Getting started

### Setup

First, make sure you have node and npm installed locally on your machine.

At this time of creation, this project was using node version 14.16.0 and npm version 7.6.

Once this repository is cloned, install all the project's dependencies with ```npm install```.

Once the project's dependencies are installed, create a MongoDB Atlas account and create a new project in it. Once you followed the prompt to create a new database go to the connect section of your cluster and follow the prompt to obtain a connections string. Take note of the connection uri and the password.

In the root directory of the project, create a ```.env``` file and add the following lines ```USER_DB_URI=<your_personnal_connection_string>``` and replace ```<your_personnal_connection_string>``` with the connection string provided in the MongoDB Atlas connection section.

Also in the ```.env``` file, add a port number property which will represent in what port to start this project in. In this example, the project will be running on port 3000.

```PORT=3000``` 

Now, running ```npm start``` should start this project on the specified port.

### Creating a new API endpoint

1. Create new controller class that extends abstract controller
2. Add new controller to the module's controller 
3. Create success and error response classes and interfaces that implement ResponseInterface
4. Create request classes that extends abstract request
5. Create success and failure event emmitters
6. Create controller command class

