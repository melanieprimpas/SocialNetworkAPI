import { Schema, model, Types, type Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
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
    friends:  [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
})
const User = model<IUser>('User', userSchema);

export default User