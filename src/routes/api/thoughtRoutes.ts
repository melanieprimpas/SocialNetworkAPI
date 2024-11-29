import { Router } from 'express';
const router = Router();
import { getThoughts,
         getSingleThought, 
         createThought, 
         deleteThought, 
         updateThought, 
         createReaction, 
         deleteReaction 
        } from '../../controllers/thoughtController.js';

//route to get all thoughts
router.get('/', getThoughts);
//route to create a thought
router.post('/', createThought);

//route to get single thought by ID
router.get('/:thoughtId', getSingleThought);
//route to delete thought by ID
router.delete('/:thoughtId', deleteThought);
//route to update thought by ID
router.put('/:thoughtId', updateThought);

//route to create reaction by thought ID
router.post('/:thoughtId/reaction', createReaction);
//rotue to delete reaction by thought ID
router.delete('/:thoughtId/reaction/:reactionId', deleteReaction);

export { router as thoughtRouter} ;

