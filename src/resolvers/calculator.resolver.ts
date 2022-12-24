import { Arg, Field, Resolver, Float, InputType, Query, UseMiddleware } from 'type-graphql';
import { rateLimiter } from '../middleware/rate-limiter';
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
	@UseMiddleware(rateLimiter('addition', 5, 60 * 1000))
	addition(@Arg('CalculatorInputs') args: Calculator) {
		return args.a + args.b;
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('addition', 5, 60 * 1000))
	subtraction(@Arg('CalculatorInputs') args: Calculator) {
		return args.a - args.b;
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('addition', 5, 60 * 1000))
	multiplication(@Arg('CalculatorInputs') args: Calculator) {
		return args.a * args.b;
	}

	@Query(() => Float)
	@UseMiddleware(rateLimiter('addition', 5, 60 * 1000))
	division(@Arg('CalculatorInputs') args: Calculator) {
		if (args.b === 0) {
			return null;
		}
		return args.a / args.b;
	}
}

// Resolvers
