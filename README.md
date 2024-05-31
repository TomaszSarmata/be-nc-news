BE NC News

Hosted Version

You can find the live version of this project here.

Project Summary

BE NC News is a RESTful API that serves as the backend for a news aggregation application. It allows users to access, interact with, and manipulate articles, comments, and user information. The API provides endpoints for retrieving articles and comments, posting new comments, updating article votes, and deleting comments.

Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites

    •	Node.js (minimum version: 14.x)
    •	PostgreSQL (minimum version: 12.x)

Cloning the Repository

First, clone the repository to your local machine using the following command:
git clone https://github.com/northcoders/be-nc-news.git
cd be-nc-news

Setting Up the Environment Variables

You need to create two .env files in the root directory of the project: .env.development and .env.test. These files should contain the following environment variables:

.env.development
PGDATABASE=nc_news

.env.test
PGDATABASE=nc_news_test

If you are running the production environment, you should have .env.production with the following variable:

.env.production

DATABASE_URL=postgres://username:password@hostname:port/database

Make sure to replace the placeholders with your actual database connection details.

Seeding the Local Database

To set up and seed the local development database, run the following command:

npm run setup-dbs
npm run seed

Running Tests

To run the test suite, use the following command:

npm test

Running the Server

To start the server in development mode, use:
npm run dev

To start the server in production mode, use:
npm start

Additional Information

Minimum Versions

    •	Node.js: 14.x
    •	PostgreSQL: 12.x

API Documentation

For detailed information about the API endpoints and their usage, refer to the hosted version’s API documentation available at /api.

License

This project is licensed under the ISC License.

Authors

    •	Tomasz Zajac
