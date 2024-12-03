import { Router } from 'express';
const router = Router();
import { getUsers,
         getSingleUser, 
         createUser, 
         deleteUser, 
         updateUser, 
         addFriend, 
         deleteFriend 
        } from '../../controllers/userController.js';

//route to get all users
router.get('/', getUsers);
//route to create a users
router.post('/', createUser);

//route to get single user by ID
router.get('/:userId', getSingleUser);
//route to delete user by ID
router.delete('/:userId', deleteUser);
//route to update user by ID
router.put('/:userId', updateUser);

//route to add friend by user ID
router.post('/:userId/friend', addFriend);
//rotue to delete reaction by thought ID
router.delete('/:userId/friend/:friendId', deleteFriend);

export { router as userRouter} ;