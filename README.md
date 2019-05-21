[![CircleCI](https://circleci.com/gh/frebliklo/dndcs-server/tree/master.svg?style=svg)](https://circleci.com/gh/frebliklo/dndcs-server/tree/master)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)

# DnD CS

API and web application for managing 5th edition Dungeons and Dragons characters.


## 1.0 Database

This project uses [Prisma](https://www.prisma.io/). To run a local instance you need the prisma CLI and Docker. Follow the instructions on their website and make sure that you have valid values set up in your environment. See the `.env.example` for reference.

When making changes to the schema make sure to run `prisma deploy -e ../.env.dev` for the changes to take effect.

If you have a secret set for your local prisma service then you can login through the CLI to get a valid token, that you can use to make requests, by running `prisma token` immediatly after deploying the service.

## 2.0 Development

Make sure to have all dependencies installed:

```bash
npm install
```

And then you should be good to go by running the dev script:

```bash
npm run dev
```

The application should be running locally on port 5000 and your console should show you the the specific url, ie `App listening on at http://localhost:5000`. You can find the GraphQL playground at [/graphql](http://localhost:5000/graphql) when the application is running.

## 3.0 Testing

This project uses Jest for running tests. Currently, the strategy is to run a local server and make requests with ApolloBoost to test from the prespective of clients.

```bash
npm run test
```
