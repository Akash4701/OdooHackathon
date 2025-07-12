"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_create_controller_1 = require("../controllers/question.create.controller");
const getQuestion_controller_1 = require("../controllers/getQuestion.controller");
const router = (0, express_1.Router)();
router.get('/', getQuestion_controller_1.getAllQuestion);
router.get('/:id', getQuestion_controller_1.getUserQuestion);
router.post('/', question_create_controller_1.createQuestion);
// router.post('/', createQuestion)
exports.default = router;
