/* eslint-disable import/no-named-as-default */
import { Arg, Field, Resolver, Float, InputType, Query, UseMiddleware } from 'type-graphql';
import { rateLimiter } from '../middleware/rate-limiter';
import { throwCustomError } from './error-message';
// import { assertValidName } from 'graphql';

@InputType()
class Calculator {
	@Field({ nullable: false, description: 'First number' })
	a: number;

	@Field({ nullable: false, description: 'Second number' })
	b: number;
}

@Resolver()
export class Resolvers {
	@Query(() => String)
	areYouAlive() {
		return 'Yes, I am alive';
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('addition', 50, 60 * 1000))
	addition(@Arg('CalculatorInputs') args: Calculator) {
		return args.a + args.b;
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('subtraction', 50, 60 * 1000))
	subtraction(@Arg('CalculatorInputs') args: Calculator) {
		return args.a - args.b;
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('multiplication', 50, 60 * 1000))
	multiplication(@Arg('CalculatorInputs') args: Calculator) {
		return args.a * args.b;
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('division', 500, 60 * 1000))
	division(@Arg('CalculatorInputs') args: Calculator) {
		if (args.b === 0) {
			throwCustomError('Division by zero', '500');
		}
		return args.a / args.b;
	}
}

// Resolvers
