import { Request, Response } from 'express';
import prisma from '../lib/db.config';
import { createAnswerSchema } from '../validation/answer.schema';

export const postAnswer = async (req: Request, res: Response) => {
    try {
        // const user = req.user
        // if (!user?.id) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        const userId = "2";
        const parsed = createAnswerSchema.parse(req.body);

        const question = await prisma.question.findUnique({
            where: { id: parsed.questionId },
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answer = await prisma.answer.create({
            data: {
                content: parsed.content,
                authorId: userId,
                questionId: parsed.questionId,
            },
        });

        // Optional notification
        if (question.authorId !== userId) {
            await prisma.notification.create({
                data: {
                    userId: question.authorId,
                    type: 'ANSWER_CREATED',
                    message: 'Someone answered your question.',
                    relatedId: answer.id,
                },
            });
        }

        res.status(201).json(answer);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
