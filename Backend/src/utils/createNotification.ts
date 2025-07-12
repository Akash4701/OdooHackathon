import prisma from '../lib/db.config';
import {NotificationType } from '@prisma/client';

export const createNotification = async ({
  userId,
  type,
  message,
  relatedId
}: {
  userId: string;
  type: NotificationType;
  message: string;
  relatedId?: string;
}) => {
  return await prisma.notification.create({
    data: {
      userId,
      type,
      message,
      relatedId
    }
  });
};
