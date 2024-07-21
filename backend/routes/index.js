import express from 'express'
import {
  getAllTopics,
  addTopic,
  updateTopic,
  updateStatus,
  deleteTopic,
} from '../controllers/index.js';

const router = express.Router();

router.get('/topics', getAllTopics);
router.post('/topics', addTopic);
router.put('/topics', updateTopic);
router.patch('/topics/status', updateStatus);
router.delete('/topics/:id', deleteTopic);

export default router
