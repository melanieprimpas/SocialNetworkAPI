import { Types } from 'mongoose';
import db from '../config/connection.js';
import { User, Thought, IUser, IThought }  from '../models/index.js';
//import { IThought } from '../models/Thought.js';
import cleanDB from './cleanDB.js';
//import { getRandomName, getRandomAssignments } from './data.js';
const seedUsers = [
    {
    username: 'harry_potter',
    email: 'harry@example.com',
    thoughts: [],
    friends: []
    },
    {
        username: 'ron_weasley',
        email: 'ron@example.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'hermione_granger',
        email: 'hermione@example.com',
        thoughts: [],
        friends: []
    }
];

const seedThoughts = [
    {
        thoughtText: 'This is my first thought!',
        username: 'harry_potter',
        reactions: []
    },
    {
        thoughtText: 'Mongo Mongo!',
        username: 'ron_weasley',
        reactions: []
    },
    {
        thoughtText: 'This is my second thought!',
        username: 'harry_potter',
        reactions: []
    },
    {
        thoughtText: 'Oculus Reparo',
        username: 'hermione_granger',
        reactions: []
    },
]

const seedDatabase = async () => {
  try {

  await db();
  await cleanDB();  

  const users: IUser[] = await User.insertMany(seedUsers);

  const thoughts: IThought[] = await Thought.insertMany(seedThoughts)

  for (const user of users) {
    user.thoughts = thoughts
        .filter(thought => thought.username === user.username)
        .map(thought => thought._id as Types.ObjectId);
    await user.save();
}
  console.log('Database seeded successfully!')

} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
}

seedDatabase();
