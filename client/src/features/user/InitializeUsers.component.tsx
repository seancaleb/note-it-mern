import { useUser } from '@/hooks';
import User from '@/interfaces/user';
import { useQueryGetUsers } from '@/queries';
import { useEffect } from 'react';

interface Users {
    users: User[];
}

const InitializeUsers = () => {
    const { initializeUsers, token, user } = useUser();

    return user?.role === 'admin' ? (
        <InitializeUserList initializeUsers={initializeUsers} token={token} />
    ) : null;
};

export default InitializeUsers;

type InitializeUserListProps = {
    initializeUsers: (args: User[]) => void;
    token: string | null;
};

function InitializeUserList({
    initializeUsers,
    token,
}: InitializeUserListProps) {
    const { data, isSuccess } = useQueryGetUsers({ token });

    const handleInitializeUsers = (args: Users) => {
        const users: User[] = args.users.map(
            ({ id, firstName, lastName, email, role }) => ({
                id,
                firstName,
                lastName,
                email,
                role,
            })
        );

        initializeUsers(users);
    };

    useEffect(() => {
        if (isSuccess) handleInitializeUsers(data);
    }, [isSuccess, data]);

    return <></>;
}
