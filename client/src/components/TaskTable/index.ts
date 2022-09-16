import TaskTable from './TaskTable.component';
import Task from '@/interfaces/task';

export { default as TaskTableToolbar } from './TaskTableToolbar.component';
export { default as TaskTableHead } from './TaskTableHead.component';

export default TaskTable;

export interface HeadCell {
    disablePadding: boolean;
    id: Exclude<keyof Task, 'id' | 'createdBy'>;
    label: string;
    numeric: boolean;
    fixWidth: boolean;
}

// Task table headings
export const headCells: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title',
        fixWidth: false,
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: true,
        label: 'Time created',
        fixWidth: true,
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status',
        fixWidth: true,
    },
];
