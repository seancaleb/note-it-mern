import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import { headCells } from '@/components/TaskTable';

interface TaskTableProps {
    numSelected?: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount?: number;
}

const TaskTableHead = (props: TaskTableProps) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected && rowCount
                                ? numSelected > 0 && numSelected < rowCount
                                : false
                        }
                        checked={Boolean(numSelected)}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all tasks',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sx={{
                            minWidth: headCell.fixWidth ? '175px' : 'none',
                            width: headCell.fixWidth ? 'none' : '100%',
                        }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TaskTableHead;
