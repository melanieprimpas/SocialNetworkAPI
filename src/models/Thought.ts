import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to current timestamp
    }
})

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];

}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,

        },
        createdAt: {
            type: Date,
            default: Date.now, // Set default value to current timestamp
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true, 
        },
        id: false, 
    }
);

thoughtSchema
    .virtual('reactionCount').get(function () {
        return this.reactions?.length;
    })

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;