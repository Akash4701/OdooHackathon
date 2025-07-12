import { Worker } from 'bullmq';
import prisma from '../lib/db.config';
import { Redis } from 'ioredis';
import { io } from '../index';

const connection = new Redis("rediss://default:AeDhAAIjcDE2YWQxMGU4MjkxOTU0M2ZjYjg4MmEwYWZmZGIwMTZjOXAxMA@lenient-turkey-57569.upstash.io:6379", { maxRetriesPerRequest: null });

new Worker('notifications', async (job) => {
    const { userId, type, message, relatedId } = job.data;

    const notification = await prisma.notification.create({
        data: {
            userId,
            type,
            message,
            relatedId,
        },
    });

    // Send notification in real-time
    io.to(userId).emit('notification', notification);

    return notification;
}, {
    connection,
});


