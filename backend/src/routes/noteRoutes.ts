import { Router } from 'express';
import { NoteController } from '../controllers/noteController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes are protected
router.use(authenticateToken);

router.get('/', NoteController.getNotes);
router.get('/:id', NoteController.getNote);
router.post('/', NoteController.createNote);
router.put('/:id', NoteController.updateNote);
router.delete('/:id', NoteController.deleteNote);

export default router;