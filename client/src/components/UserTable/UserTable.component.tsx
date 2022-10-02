import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import { UserTableToolbar, UserTableHead } from '@/components/UserTable';
import Chip from '@/components/Chip';
import User from '@/interfaces/user';

import { useUser } from '@/hooks';

const UserTable = () => {
    const [selected, setSelected] = useState<readonly string[]>([]);
    const { users } = useUser();

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = users.map((n) => n.id);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    };

    const handleClick = (event: MouseEvent<unknown>, id: string) => {
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
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    useEffect(() => {
        setSelected([]);
    }, [users]);

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
                <UserTableToolbar
                    numSelected={selected.length}
                    selected={selected.length === 1 ? selected[0] : selected}
                />
                <TableContainer>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <UserTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={users.length}
                        />
                        <TableBody>
                            <>
                                {users.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
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

export default UserTable;

interface RowProps {
    row: User;
    handleClick: (event: MouseEvent<unknown>, id: string) => void;
    isItemSelected: boolean;
    labelId: string;
}

function Row({ row, handleClick, isItemSelected, labelId }: RowProps) {
    return (
        <TableRow
            hover
            onClick={(event) => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            sx={{
                cursor: 'pointer',
            }}
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
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center' }}
                >
                    <Avatar
                        sx={{
                            height: 35,
                            width: 35,
                            fontSize: '14px',
                            bgcolor: 'primary.light',
                        }}
                    >
                        {row.firstName[0]}
                        {row.lastName[0]}
                    </Avatar>
                    <p>{row.email}</p>
                </Stack>
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    minWidth: '175px',
                    py: '20px',
                }}
                padding="none"
            >
                {row.firstName}
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    minWidth: '175px',
                    py: '20px',
                }}
                padding="none"
            >
                {row.lastName}
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    minWidth: '175px',
                    py: '20px',
                }}
                padding="none"
            >
                <Chip type={row.role} />
            </TableCell>
        </TableRow>
    );
}
