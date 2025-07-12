import { Router } from 'express';
import authRoutes from './authRoutes';
import questionRoutes from './questionRoutes';
// import answerRoutes from './answerRoutes';
// import voteRoutes from './voteRoutes';
// import notificationRoutes from './notificationRoutes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
// router.use('/answers', answerRoutes);
// router.use('/votes', voteRoutes);
// router.use('/notifications', notificationRoutes);


export default router;
