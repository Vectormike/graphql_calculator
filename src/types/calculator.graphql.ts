import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

// Define the schema of the APIs

const typeDefs = gql`
	type CalculationInput {
		a: Float
		b: Float
	}

	type Query {
		areYouAlive(): String
		addition(input: Calculator): Float!
		subtraction(input: Calculator): Float!
		multiplication(input: Calculator): Float!
		division(input: Calculator): Float!
	}
`;

const Schema = makeExecutableSchema({ typeDefs });

export default Schema;
