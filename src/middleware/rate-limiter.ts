import { MiddlewareFn } from 'type-graphql';
import redis from '../config/redis';

export const rateLimiter: (key: string, limit: number, duration: number) => MiddlewareFn<any> =
	(key, limit, duration) =>
	async ({ context }, next) => {
		const current = await redis.incr(key);
		if (current > limit) {
			throw new Error('Too many requests within 1 day');
		} else if (current === 1) {
			await redis.expire(key, duration);
		}

		return next();
	};
