import { Request, Response } from 'express';
import prisma from '../lib/db.config';
import { createNotificationSchema } from '../validation/notification.schema';
import { any, string, ZodError } from 'zod';

/**
 * GET /api/notifications
 * Returns the most recent notifications for the logged-in user.
 */
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * PUT /api/notifications/mark-read
 * Marks all notifications as read for the logged-in user.
 */
export const markAllNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/notifications
 * Creates a new notification (admin/internal use).
 */
export const createNotification = async (req: Request, res: Response) => {
  try {
    const parsed = createNotificationSchema.parse(req.body);

    const notification = await prisma.notification.create({
      data: parsed
    });

    res.status(201).json(notification);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues});
    }

    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
