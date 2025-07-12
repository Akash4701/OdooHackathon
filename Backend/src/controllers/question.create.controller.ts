import { Request, Response } from 'express';
import prisma from '../lib/db.config';
import { z } from "zod"

const CreateQuestionSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    tagIds: z.array(z.string().cuid()).optional(),
});



type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;



export const createQuestion = async (req: Request, res: Response) => {

    console.log("whdxkjwbk")
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


    const result = CreateQuestionSchema.safeParse(req.body);

    if (!result.success) {
        const errorMessages = result.error.flatten().fieldErrors;
        return res.status(400).json({ error: 'Invalid input', details: errorMessages });
    }

    const { title, description, tagIds } = result.data;

    try {
        const question = await prisma.question.create({
            data: {
                title,
                description,
                authorId: userId,
                tags: {
                    create: tagIds?.map((tagId) => ({
                        tag: {
                            connect: { id: tagId },
                        },
                    })) || [],
                },
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        res.status(201).json(question);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


