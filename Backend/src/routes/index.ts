import { Router } from 'express';
import authRoutes from './authRoutes';
import questionRoutes from './questionRoutes';
import answerRoutes from './answerRoutes';
import voteRoutes from './voteRoutes';
import commentRoutes from './commentRoutes';
import notificationRoutes from './notificationRoutes';
import badgeRoutes from './badgeRoutes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/votes', voteRoutes);
router.use('/comments', commentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/badges', badgeRoutes);

export default router;
