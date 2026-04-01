## Overview - Event API
This API allows users to view, edit and push events to and from a firebase database.
It provides an easy method to create events, including validation and a Helmet/CORs security config.
It makes life a little bit easier for event planners and users alike, allowing planners to create events
and users to view them.

## Installation Instructions:
###Prerequisites:
NodeJS >= v20
Swagger/JSDoc
Typescript
ts-Node
Express
Helmet.JS
CORS
dotenv

## installation instructions:
### installing pre requisites
Run the following in the terminal:
npm install typescript ts-node @types/node --save-dev
npm install express
npm install @types/express --save-dev
npm install swagger-ui-express swagger-jsdoc
npm install -D @redocly/cli
npm install dotenv
npm install helmet
npm install cors

### Example dotenv setup
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=bed-demo-g3a74
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSOME_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-k9r4p@cloud-project-b7c31.iam.gserviceaccount.com
SWAGGER_SERVER_URL=http://localhost:3000/api/v1

### Starting the server:
Simply type npm start in the terminal, and the server will be hosted on localhost:3000 by default.

## Endpoint examples
Creating an event:
curl --request POST \
  --url http://localhost:3000/api/v1/events \
  --header 'content-type: application/json' \
  --data '{
  "id": "hoho",
  "name": "heehee",
  "description": "Learn back-end from bill gates",
  "date": "2026-03-02T18:00:00.000Z",
  "capacity": 9,
  "registrationCount": 1,
  "status": "postponed",
  "category": "Workshop"
}'

Example of a successful response:
{
  "status": "success",
  "data": {
    "id": "q2wNcXF7ZcniGIb4DrF3",
    "name": "jerble",
    "date": "2026-05-02T18:00:00.000Z",
    "capacity": 9,
    "registrationCount": 1,
    "status": "Active",
    "createdAt": "2026-04-01T01:40:56.797Z",
    "updatedAt": "2026-04-01T01:40:56.797Z"
  },
  "message": "Item created successfully"
}

Getting all events
curl --request GET \
  --url http://localhost:3000/api/v1/events \
  --header 'content-type: application/json'

Successful response will include all events registered in the database

Deleting an event
curl --request DELETE \
  --url http://localhost:3000/api/v1/events/{ID_TO_BE_DELETED}

successful response:
{
  "status": "success",
  "data": null,
  "message": "Item deleted successfully"
}

## Swagger documentation:
https://sethboyer2.github.io/back-end-dev-assignment-3/

If you encounter any issues with the github page, you can access the documentation locally
by running the server and going to "http://localhost:{YOUR_PORT}/api-docs"