"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   GET /api/notifications
router.get('/', authMiddleware_1.authMiddleware, notification_controller_1.getUserNotifications);
// @route   PUT /api/notifications/mark-read
router.put('/mark-read', authMiddleware_1.authMiddleware, notification_controller_1.markAllNotificationsRead);
exports.default = router;
