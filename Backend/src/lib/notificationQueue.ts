import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis("rediss://default:AeDhAAIjcDE2YWQxMGU4MjkxOTU0M2ZjYjg4MmEwYWZmZGIwMTZjOXAxMA@lenient-turkey-57569.upstash.io:6379");

export const notificationQueue = new Queue('notifications', {
    connection,
});
