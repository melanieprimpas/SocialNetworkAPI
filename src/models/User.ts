import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: string[];
    friends: string[];
    friendCount: number;
}

const userSchema = new Schema<IUser>({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true,
        validate: { validator: (email: string) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
        },
        message: 'Email validation failed.'
    }},
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendCount: Number,
})
const User = model<IUser>('User', userSchema);

export default User