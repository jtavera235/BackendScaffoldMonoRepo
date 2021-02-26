### Backend Scaffold user to create a base representation of a backend in order to not do this from scratch everytime.

## Getting started

# Setup

First, make sure you have node and npm installed locally on your machine

At this time of creation, this project was using node version 6 and npm version 6

Once this repository is cloned you have to configure some properties

First, create a MongoDB Atlas account and create a new project in it

Eventually you will have to create a database name and a secret password

In the root directory, create a ```.env``` file and add the following lines ```USER_DB_URI=your_personnal_connection_string``` and replace ```your_personnal_connection_string``` with the connection string MongoDB gave you

Also, add a port number property which will represent in what port to start this project in.

```PORT=3000``` 

In this example, the project will be running on port 3000.

Now, running ```npm start``` should start this project on the specified port and with a database connection already established

# Creating a new API endpoint

1. Create new controller class that extends abstract controller
2. Add new controller to the module's controller 
3. Create response classes and interfaces that implement ResponseInterface
4. Create request classes that extends abstract request
5. Create success and failure event emmitters
6. Create controller command class

