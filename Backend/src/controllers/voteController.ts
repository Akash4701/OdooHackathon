import { Request, Response } from 'express';
import prisma from '../lib/db.config';
import { voteSchema } from '../validation/vote.schema';
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email?: string;
                role?: string
            };
        }
    }
}

export const vote = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user?.id) return res.status(401).json({ message: 'Unauthorized' });


        const userId = user.id;
        const { targetId, targetType, value } = voteSchema.parse(req.body);

        const isUpvote = value === 'up';
        const voteValue = isUpvote ? 1 : -1;

        if (targetType === 'question') {
            const existingVote = await prisma.vote.findUnique({
                where: {
                    userId_questionId: {
                        userId: userId,
                        questionId: targetId,
                    },
                },
            });

            if (existingVote) {
                if (existingVote.value === voteValue) {

                    await prisma.vote.delete({
                        where: {
                            userId_questionId: {
                                userId: userId,
                                questionId: targetId,
                            },
                        },
                    });
                    return res.status(200).json({ message: 'Vote removed' });
                } else {

                    await prisma.vote.update({
                        where: {
                            userId_questionId: {
                                userId: userId,
                                questionId: targetId,
                            },
                        },
                        data: { value: voteValue },
                    });
                    return res.status(200).json({ message: 'Vote updated' });
                }
            }

            // new vote
            await prisma.vote.create({
                data: {
                    userId: userId,
                    questionId: targetId,
                    value: voteValue,
                },
            });

            return res.status(201).json({ message: 'Voted successfully' });
        }

        if (targetType === 'answer') {
            const existingVote = await prisma.vote.findUnique({
                where: {
                    userId_answerId: {
                        userId: userId,
                        answerId: targetId,
                    },
                },
            });

            if (existingVote) {
                if (existingVote.value === voteValue) {
                    await prisma.vote.delete({
                        where: {
                            userId_answerId: {
                                userId: userId,
                                answerId: targetId,
                            },
                        },
                    });
                    return res.status(200).json({ message: 'Vote removed' });
                } else {
                    await prisma.vote.update({
                        where: {
                            userId_answerId: {
                                userId: userId,
                                answerId: targetId,
                            },
                        },
                        data: { value: voteValue },
                    });
                    return res.status(200).json({ message: 'Vote updated' });
                }
            }

            await prisma.vote.create({
                data: {
                    userId: userId,
                    answerId: targetId,
                    value: voteValue,
                },
            });

            return res.status(201).json({ message: 'Voted successfully' });
        }

        return res.status(400).json({ message: 'Invalid target type' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
