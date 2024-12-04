import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts');
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
        res.json(`User was successfully added: ${user}`)
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
        res.status(200).json(`Updated: ${user}`);
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
    
       const thought = await Thought.find({ username: user.username });

       if (thought.length === 0) {
            return res.json({ message: 'User successfully deleted, but no associated thoughts to remove.'})        
        } else {
            await Thought.deleteMany({ username: user.username })
        }
    
        return res.json({ message: 'User successfully deleted and associated thoughts were removed' });

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// add a new friend to users friend list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(`Added new friend to ${user}.`)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// delete a reaction and pull from the related thought
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({
                message: 'Friend not found',
            });
        }
        const friend = user.friends.some(friendId => friendId.toString() === req.params.friendId);
        if (!friend) {
            return res.status(404).json({
                message: 'Friend not found',
            });
        }

        //Friend exists => remove friend from user
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        ).populate('friends')

        return res.json({ message: `Friend successfully deleted from ${updatedUser}` });

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}