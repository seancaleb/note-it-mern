import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import { TaskTableToolbar, TaskTableHead } from '@/components/TaskTable';
import Chip from '@/components/Chip';
import Task, { Status } from '@/interfaces/task';
import { useTask } from '@/hooks';
import { format } from 'date-fns';

interface TaskTableProps {
    status: Lowercase<Status> | 'all';
}

const TaskTable = ({ status }: TaskTableProps) => {
    const [selected, setSelected] = useState<readonly string[] | undefined>([]);
    const { tasks } = useTask();

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tasks
                ?.filter((n) =>
                    status === 'all' ? true : n.status.toLowerCase() === status
                )
                .map((n) => n.id);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    };

    const handleClick = (event: MouseEvent<unknown>, id: string) => {
        if (selected) {
            const selectedIndex = selected.indexOf(id);
            let newSelected: readonly string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }

            setSelected(newSelected);
        }
    };

    const isSelected = (id: string) => selected?.indexOf(id) !== -1;

    useEffect(() => {
        setSelected([]);
    }, [status, tasks]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
                elevation={0}
            >
                <TaskTableToolbar
                    numSelected={selected?.length}
                    selected={selected?.length === 1 ? selected[0] : selected}
                />
                <TableContainer>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <TaskTableHead
                            numSelected={selected?.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={tasks?.length}
                        />
                        <TableBody>
                            <>
                                {tasks
                                    ?.filter((row) =>
                                        status === 'all'
                                            ? true
                                            : row.status.toLowerCase() ===
                                              status
                                    )
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row.id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <Row
                                                row={row}
                                                handleClick={handleClick}
                                                isItemSelected={isItemSelected}
                                                labelId={labelId}
                                                key={row.id}
                                            />
                                        );
                                    })}
                            </>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default TaskTable;

interface RowProps {
    row: Pick<Task, 'id' | 'title' | 'createdAt'> & {
        status: Status;
    };
    handleClick: (event: MouseEvent<unknown>, id: string) => void;
    isItemSelected: boolean;
    labelId: string;
}

function Row({ row, handleClick, isItemSelected, labelId }: RowProps) {
    const timeCreated = format(new Date(row.createdAt), 'h:mm a');

    return (
        <TableRow
            hover
            onClick={(event) => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                sx={{ width: '100%' }}
            >
                {row.title}
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    minWidth: '175px',
                    py: '20px',
                }}
                padding="none"
            >
                {timeCreated}
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    minWidth: '175px',
                    py: '20px',
                }}
                padding="none"
            >
                <Chip type={row.status} />
            </TableCell>
        </TableRow>
    );
}
