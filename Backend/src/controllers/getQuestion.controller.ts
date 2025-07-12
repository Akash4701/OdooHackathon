import { Request, Response } from 'express';
import prisma from '../lib/db.config';

export const getAllQuestion = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
        const [questions, totalCount] = await Promise.all([
            prisma.question.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            reputation: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                    votes: {
                        select: { value: true }
                    },
                    answers: {
                        select: {
                            id: true,
                            isAccepted: true,
                        },
                    },
                    comments: {
                        select: {
                            id: true,
                        },
                    },
                },
            }),
            prisma.question.count(),
        ]);

        res.status(200).json({
            data: questions,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUserQuestion = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
        const [questions, totalCount] = await Promise.all([
            prisma.question.findMany({
                where: { authorId: userId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            reputation: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                    votes: {
                        select: { value: true }
                    },
                    answers: {
                        select: {
                            id: true,
                            isAccepted: true,
                        },
                    },
                    comments: {
                        select: {
                            id: true,
                        },
                    },
                },
            }),
            prisma.question.count({
                where: { authorId: userId },
            }),
        ]);

        res.status(200).json({
            data: questions,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching user questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
