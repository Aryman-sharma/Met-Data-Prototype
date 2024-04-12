import { Router } from 'express';
const router = Router();
import generateData from '../controllers/weather.controller';

router.post('/generateData',generateData);


export default router;
