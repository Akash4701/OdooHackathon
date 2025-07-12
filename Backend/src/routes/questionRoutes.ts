import { Router } from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById
} from '../controllers/questionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// @route   GET /api/questions
router.get('/', getAllQuestions);

// @route   GET /api/questions/:id
router.get('/:id', getQuestionById);

// @route   POST /api/questions
router.post('/', authMiddleware, createQuestion);

export default router;
