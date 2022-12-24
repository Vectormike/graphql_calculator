import { Mutation, Arg, Field, Resolver, Float, InputType, Query, UseMiddleware } from 'type-graphql';
import rateLimiter from '../middleware/rate-limiter';
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
	addition(@Arg('CalculatorInputs') args: Calculator) {
		rateLimiter('addition', 5, 60 * 1000);
		return args.a + args.b;
	}

	@Query(() => Float)
	subtraction(@Arg('CalculatorInputs') args: Calculator) {
		rateLimiter('addition', 5, 60 * 1000);
		return args.a - args.b;
	}

	@Query(() => Float)
	multiplication(@Arg('CalculatorInputs') args: Calculator) {
		rateLimiter('addition', 5, 60 * 1000);
		return args.a * args.b;
	}

	@Query(() => Float)
	division(@Arg('CalculatorInputs') args: Calculator) {
		rateLimiter('addition', 5, 60 * 1000);
		return args.a / args.b;
	}
}

// Resolvers
