import { Router } from 'express';
import {
  postAnswer
} from '../controllers/answer.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();


router.post('/', postAnswer);


export default router;
