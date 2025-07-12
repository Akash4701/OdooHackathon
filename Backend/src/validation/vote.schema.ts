import { z } from 'zod';

export const voteSchema = z.object({
    targetId: z.string().cuid(), // questionId or answerId
    targetType: z.enum(['question', 'answer']),
    value: z.enum(['up', 'down']),
});
