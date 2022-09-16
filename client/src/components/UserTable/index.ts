import UserTable from './UserTable.component';
import User from '@/interfaces/user';

export { default as UserTableToolbar } from './UserTableToolbar.component';
export { default as UserTableHead } from './UserTableHead.component';

export default UserTable;

export interface HeadCell {
    disablePadding: boolean;
    id: keyof User;
    label: string;
    numeric: boolean;
    fixWidth: boolean;
}

// User table headings
export const headCells: readonly HeadCell[] = [
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
        fixWidth: true,
    },
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'First name',
        fixWidth: false,
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: true,
        label: 'Last name',
        fixWidth: true,
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: true,
        label: 'Role',
        fixWidth: true,
    },
];
