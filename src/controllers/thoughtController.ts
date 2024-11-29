import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get single thought 
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    } 
}

// create a thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
        
          if (!user) {
            res
             .status(404)
             .json({ message: 'Thought created, but found no user with that ID' })
          } else {
            res.json('Created the thought!')
          }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
// delete a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }

        const user = await User.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thought: req.params.thoughtId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'Thought deleted, but no user found',
            });
        }

        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
// update thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // Replaces name with value in body param
            req.body,   
            { new: true }
        )
        res.status(200).json(thought);
        console.log(`Updated: ${thought}`);
      } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
}
