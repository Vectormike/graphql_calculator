/* eslint-disable no-promise-executor-return */
/* eslint-disable no-console */
import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { Resolvers } from './resolvers/calculator.resolver';
import Schema from './types/calculator.graphql';

dotenv.config();

export const bootstrap = async () => {
	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [Resolvers],
		}),
		// plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http.createServer(app) })],
		context: ({ req, res }) => ({ req, res }),
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });
	return app;
};

export const startServer = async () => {
	const app = await bootstrap();

	const port = process.env.PORT || 3000;

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

startServer();
