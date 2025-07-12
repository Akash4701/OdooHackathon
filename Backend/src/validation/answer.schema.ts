import { z } from 'zod';

export const createAnswerSchema = z.object({
    content: z
        .string()
        .min(10, 'Answer content must be at least 10 characters long'),

    questionId: z.string().cuid('Invalid question ID'),
});
