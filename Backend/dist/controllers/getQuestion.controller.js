"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQuestion = exports.getAllQuestion = void 0;
const db_config_1 = __importDefault(require("../lib/db.config"));
const getAllQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield db_config_1.default.question.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        reputation: true,
                    },
                },
                tags: {
                    include: {
                        tag: true, // fetch the tag info inside the QuestionTag
                    },
                },
                votes: true,
                answers: {
                    select: {
                        id: true,
                        isAccepted: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        res.status(200).json(questions);
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllQuestion = getAllQuestion;
const getUserQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const questions = yield db_config_1.default.question.findMany({
            where: {
                authorId: userId
            },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        reputation: true,
                    },
                },
                tags: {
                    include: {
                        tag: true, // fetch the tag info inside the QuestionTag
                    },
                },
                votes: true,
                answers: {
                    select: {
                        id: true,
                        isAccepted: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        res.status(200).json(questions);
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUserQuestion = getUserQuestion;
