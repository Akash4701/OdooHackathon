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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_config_1 = __importDefault(require("./lib/db.config"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use((0, cookie_parser_1.default)());
app.get("/api/healthcheck", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_config_1.default.user.findFirst();
        res.status(200).json({ status: "ok", message: "Database connected" });
    }
    catch (err) {
        console.error("Healthcheck DB error:", err);
        res.status(500).json({ status: "error", message: "Database connection error" });
    }
}));
app.use("/api/v1/question", questionRoutes_1.default);
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.$disconnect();
    process.exit(0);
}));
exports.default = app;
