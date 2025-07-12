
import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware";
import { vote } from "../controllers/voteController";

const router = Router();
router.post('/vote',authMiddleware, vote);
export default router;

// import { Router } from "express";
// import { authMiddleware } from "../middlewares/authMiddleware";
// import {VoteOnAnswer} from "../controllers/voteController";

// const router = Router();
// router.post('/:answerId', authMiddleware, VoteOnAnswer);
// export default router;

