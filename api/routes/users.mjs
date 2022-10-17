import express from 'express';
import { addUser } from '../controllers/user.mjs';

const router = express.Router();

router.use('/add', addUser)

export default router;