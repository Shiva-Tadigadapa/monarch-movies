import express from 'express';
import {getMovies} from '../controllers/movieController.js';

const router = express.Router();

router.get('/hi', getMovies);

export default router;