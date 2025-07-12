
import { z } from 'zod';

export const createNotificationSchema = z.object({
  userId: z.string().cuid('Invalid user ID'),
  type: z.enum(['QUESTION_CREATED', 'ANSWER_CREATED', 'COMMENT_CREATED', 'MENTION','BADGE_GRANTED']),
  message: z.string().min(1, 'Notification message is required'),
  relatedId: z.string().cuid('Invalid related ID').optional()
});
