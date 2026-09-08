import {Router} from 'express';
import {authenticate} from '../middlewares/auth.middleware';
import {authorizeScoreAccess} from '../middlewares/authorize.middleware';
import {getScore} from '../controllers/score.controllers';


const router = Router();

router.get('/score/:rut', authenticate, authorizeScoreAccess, getScore);

export default router;