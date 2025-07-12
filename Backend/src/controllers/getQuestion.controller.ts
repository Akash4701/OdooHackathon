import { Request, Response } from 'express';
import prisma from '../lib/db.config';

export const getAllQuestion = async (req: Request, res: Response) => {
    try {
        const questions = await prisma.question.findMany({
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
                        tag: true, // fetch the tag info inside the QuestionTag
                    },
                },
                votes: true,
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
        });

        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUserQuestion = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const questions = await prisma.question.findMany({
            where: {
                authorId: userId
            },
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
                        tag: true, // fetch the tag info inside the QuestionTag
                    },
                },
                votes: true,
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
        });

        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}