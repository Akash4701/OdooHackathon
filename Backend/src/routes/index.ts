import { Router } from 'express';
import authRoutes from './authRoutes';
import questionRoutes from './questionRoutes';
import answerRoutes from './answerRoutes';
import voteRoutes from './voteRoutes';


const router = Router();


router.use('/auth', authRoutes);
router.use('/question', questionRoutes);
router.use('/answer', answerRoutes);
router.use('/', voteRoutes);


export default router;
