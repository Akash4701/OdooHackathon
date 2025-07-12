"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const voteController_1 = require("../controllers/voteController");
const router = (0, express_1.Router)();
router.post('/:answerId', authMiddleware_1.authMiddleware, voteController_1.VoteOnAnswer);
exports.default = router;
