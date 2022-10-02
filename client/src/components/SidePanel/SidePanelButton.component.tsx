import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SidePanelMenu } from '@/components/SidePanel';

type SidePanelButtonProps = {
    menu: SidePanelMenu;
    handleNavigate: (path: string) => void;
};

const SidePanelButton = ({ menu, handleNavigate }: SidePanelButtonProps) => {
    const { id, name, icon: Icon } = menu;

    return (
        <Button
            key={id}
            sx={{
                justifyContent: 'flex-start',
                px: 'unset',
                py: 'unset',
                minWidth: 'unset',
                backgroundColor:
                    location.pathname === '/' + name.toLocaleLowerCase() ||
                    location.pathname ===
                        '/dashboard/' + name.toLocaleLowerCase()
                        ? 'primary.dark'
                        : 'none',
                '&:hover': {
                    backgroundColor:
                        location.pathname === '/' + name.toLocaleLowerCase() ||
                        location.pathname ===
                            '/dashboard/' + name.toLocaleLowerCase()
                            ? 'primary.dark'
                            : 'none',
                },
                borderRadius: 0,
            }}
            disableRipple
            disableTouchRipple
        >
            <Stack
                onClick={() => handleNavigate(name)}
                direction="row"
                spacing={2.5}
                sx={{
                    py: '12px',
                    px: {
                        xs: 'unset',
                        md: 3,
                    },
                    justifyContent: {
                        xs: 'center',
                        md: 'flex-start',
                    },
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Icon
                    color={
                        location.pathname === '/' + name.toLocaleLowerCase() ||
                        location.pathname ===
                            '/dashboard/' + name.toLocaleLowerCase()
                            ? 'white'
                            : 'white'
                    }
                />
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: '14px',
                        color:
                            location.pathname ===
                                '/' + name.toLocaleLowerCase() ||
                            location.pathname ===
                                '/dashboard/' + name.toLocaleLowerCase()
                                ? 'white'
                                : 'white',
                        display: {
                            xs: 'none',
                            md: 'block',
                        },
                    }}
                >
                    {name}
                </Typography>
            </Stack>
        </Button>
    );
};

export default SidePanelButton;
