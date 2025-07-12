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
exports.createQuestion = void 0;
const db_config_1 = __importDefault(require("../lib/db.config"));
const zod_1 = require("zod");
const CreateQuestionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    tagIds: zod_1.z.array(zod_1.z.string().cuid()).optional(),
});
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("whdxkjwbk");
    const userId = "1";
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const result = CreateQuestionSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessages = result.error.flatten().fieldErrors;
        return res.status(400).json({ error: 'Invalid input', details: errorMessages });
    }
    const { title, description, tagIds } = result.data;
    try {
        const question = yield db_config_1.default.question.create({
            data: {
                title,
                description,
                authorId: userId,
                tags: {
                    create: (tagIds === null || tagIds === void 0 ? void 0 : tagIds.map((tagId) => ({
                        tag: {
                            connect: { id: tagId },
                        },
                    }))) || [],
                },
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        res.status(201).json(question);
    }
    catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createQuestion = createQuestion;
