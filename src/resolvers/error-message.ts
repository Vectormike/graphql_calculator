import { ApolloError } from 'apollo-server-core';

export const throwCustomError = (message: string, code: string, fields?: Record<string, any>) => {
	throw new ApolloError(message, code, fields);
};
