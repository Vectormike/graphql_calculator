import { MiddlewareFn } from 'type-graphql';
import redis from '../config/redis';

export const rateLimiter: (key: string, limit: number, duration: number) => MiddlewareFn<unknown> = (key, limit, duration) => async (next: any) => {
	const current = await redis.incr(key);
	if (current === 1) {
		await redis.expire(key, duration);
	}
	if (current > limit) {
		throw new Error('Rate limit exceeded');
	}

	return next();
};
