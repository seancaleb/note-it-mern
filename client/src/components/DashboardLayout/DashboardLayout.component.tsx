import NavBar from '@/components/NavBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SidePanel from '@/components/SidePanel';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { experimental_sx as sx } from '@mui/system';

import { InitializeTasks } from '@/features/task';

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <Container>
            {/* Navigation bar  */}

            {/* Dashboard Body  */}
            <Layout>
                {/* Column 1 - Side Panel  */}
                <SidePanel />

                {/* Column 2 - Dashboard Content  */}
                <Box sx={{ flexGrow: 1 }}>
                    <Body>
                        <NavBar />
                        {/* Content of each dasboard page will be placed here  */}
                        {children}
                    </Body>
                </Box>
            </Layout>

            {/* Initialize all tasks after user have logged in */}
            <InitializeTasks />
        </Container>
    );
};

export default DashboardLayout;

const Container = styled(Box)(({ theme }) =>
    sx({
        minHeight: '100vh',
        bgcolor: 'primary.50',
        // bgColor: 'rgba(40, 53, 147, .03)'
    })
);

const Layout = styled(Stack)(({ theme }) =>
    sx({
        minHeight: '100vh',
        flexDirection: 'row',
    })
);

const Body = styled(Stack)(({ theme }) =>
    sx({
        pt: 3,
        gap: theme.spacing(2),
        px: {
            xs: '16px',
            sm: '32px',
        },
        height: '100%',
    })
);
