import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { vote } from "../controllers/voteController";

const router = Router();
router.post('/', vote);
export default router;