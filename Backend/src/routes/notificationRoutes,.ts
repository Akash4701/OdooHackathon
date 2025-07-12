import { Router } from "express";
import { createNotification, getUserNotifications, markAllNotificationsAsRead } from "../controllers/notification.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router= Router();
router.get('/',authMiddleware, getUserNotifications );
router.put('/mark-read', markAllNotificationsAsRead);
router.post('/',authMiddleware, createNotification );

export default router;