import { Router } from 'express';
import {
    createQuestion
} from '../controllers/question.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();



// router.get('/', getAllQuestions);


// router.get('/:id', getQuestionById);


router.post('/', authMiddleware, createQuestion);


router.post('/', createQuestion)

export default router;  
