"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const questionRoutes_1 = __importDefault(require("./questionRoutes"));
const answerRoutes_1 = __importDefault(require("./answerRoutes"));
const voteRoutes_1 = __importDefault(require("./voteRoutes"));
const notificationRoutes_1 = __importDefault(require("./notificationRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', authRoutes_1.default);
router.use('/questions', questionRoutes_1.default);
router.use('/answers', answerRoutes_1.default);
router.use('/votes', voteRoutes_1.default);
router.use('/notifications', notificationRoutes_1.default);
exports.default = router;
