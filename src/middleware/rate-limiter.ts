import { NextFunction } from 'express';
import redis from '../config/redis';

const rateLimiter = async (key: string, limit: number, duration: number) => async (next: NextFunction) => {
	const current = await redis.incr(key);
	if (current === 1) {
		await redis.expire(key, duration);
	}
	if (current > limit) {
		throw new Error('Rate limit exceeded');
	}

	return next();
};

export default rateLimiter;
