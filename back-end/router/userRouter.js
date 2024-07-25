import express from 'express'
import { User } from '../model/User.js';
import { deleteUser, getAllRegister, getByid, register, updateRegister } from '../controller/userController.js';

const router = express.Router();

router.post('/api/register', register);
router.get('/api/getall',getAllRegister)
router.put('/api/update/:id',updateRegister)
router.get('/api/getid/:id',getByid)
router.delete('/api/delete/:id',deleteUser)

export default router;