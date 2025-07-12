import { Router } from 'express';
import {
    createQuestion
} from '../controllers/question.create.controller';

import { getAllQuestion, getUserQuestion } from '../controllers/getQuestion.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();



router.get('/', getAllQuestion);


router.get('/:id', getUserQuestion);


router.post('/', authMiddleware, createQuestion);


// router.post('/', createQuestion)

export default router;  
