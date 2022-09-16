export type Status = 'active' | 'pending' | 'completed';

export default interface Task {
    id: string;
    title: string;
    status: Status;
    createdBy: string;
    createdAt: Date;
}

export interface StatusCount {
    title: Status | 'all';
    count: number;
}
