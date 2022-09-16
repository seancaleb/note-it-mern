import { Schema, model, Types } from 'mongoose';
import { TaskDocument } from '@/resources/task/task.interface';

const TaskSchema = new Schema<TaskDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'pending', 'completed'],
        },
    },
    { timestamps: true }
);

TaskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

TaskSchema.set('toJSON', {
    virtuals: true,
});

export default model<TaskDocument>('Task', TaskSchema);
