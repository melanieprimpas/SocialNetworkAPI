import { User } from '../models/index.js';
import { Request, Response } from 'express';

// get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get single user
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    } 
}

// create a user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// update user

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            // Replaces name with value in body param
            req.body,   
            { new: true }
        )
        res.status(200).json(user);
        console.log(`Updated: ${user}`);
      } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
}

// delete a user 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}