import { z } from 'zod';


const CreateQuestionSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    tagIds: z.array(z.string().cuid()).optional(),
});

type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;


export { CreateQuestionSchema, CreateQuestionInput }; 