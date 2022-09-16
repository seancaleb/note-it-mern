import { Document, Types } from 'mongoose';

export default interface Task {
    title: string;
    createdBy: typeof Types.ObjectId;
    status: Status;
}

export type TaskDocument = Task & Document;
export type Status = 'active' | 'pending' | 'completed';
