import express from 'express';
import { getAllComments, addComment, deleteComment, updateComment } from '../controller/commentController.js';
const router = express.Router();

router.get('/api/getComments', getAllComments);

router.post('/api/addComment', addComment);

router.post('/api/updateComment', updateComment);

router.post('/api/deleteComment', deleteComment);



export default router;

