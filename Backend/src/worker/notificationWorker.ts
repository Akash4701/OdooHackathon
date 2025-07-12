import { Worker } from 'bullmq';
import prisma from '../lib/db.config';
import { Redis } from 'ioredis';
import { io } from '../index';

const connection = new Redis("rediss://default:AeDhAAIjcDE2YWQxMGU4MjkxOTU0M2ZjYjg4MmEwYWZmZGIwMTZjOXAxMA@lenient-turkey-57569.upstash.io:6379", {
    maxRetriesPerRequest: null
});

export const notificationWorker = new Worker('notifications', async (job) => {
    const { userId, type, message, relatedId } = job.data;

    try {
        // Create notification in database
        const notification = await prisma.notification.create({
            data: {
                userId,
                type,
                message,
                relatedId,
            },
        });

        // Send notification in real-time via Socket.IO
        io.to(userId).emit('notification', notification);

        console.log(`Notification sent to user ${userId}: ${message}`);
        return notification;
    } catch (error) {
        console.error('Error processing notification:', error);
        throw error;
    }
}, {
    connection,
});


notificationWorker.on('completed', (job) => {
    console.log(`Notification job ${job.id} completed`);
});

notificationWorker.on('failed', (job, err) => {
    console.error(`Notification job ${job?.id} failed:`, err);
});