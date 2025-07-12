import { Router } from 'express';
import authRoutes from './authRoutes';
import questionRoutes from './questionRoutes';
import answerRoutes from './answerRoutes';
import voteRoutes from './voteRoutes';
import notificationRoutes from './notificationRoutes,';


const router = Router();


router.use('/auth', authRoutes);
router.use('/question', questionRoutes);
router.use('/answer', answerRoutes);
router.use('/', voteRoutes);
router.use('/notification', notificationRoutes);



export default router;
