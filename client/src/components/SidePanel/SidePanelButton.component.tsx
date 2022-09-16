import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SidePanelMenu } from '@/components/SidePanel';

type SidePanelButtonProps = {
    menu: SidePanelMenu;
    handleNavigate: (path: string) => void;
};

const SidePanelButton = ({ menu, handleNavigate }: SidePanelButtonProps) => {
    const { id, name, icon } = menu;

    return (
        <Button
            key={id}
            sx={{
                justifyContent: 'flex-start',
                px: 'unset',
                py: 'unset',
                minWidth: 'unset',
            }}
        >
            <Stack
                onClick={() => handleNavigate(name)}
                direction="row"
                spacing={3}
                sx={{
                    px: {
                        xs: 'unset',
                        md: '32px',
                    },
                    py: {
                        xs: '8px',
                        md: '12px',
                    },
                    justifyContent: {
                        xs: 'center',
                        md: 'flex-start',
                    },
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                {icon}
                <Typography
                    variant="subtitle1"
                    sx={{
                        color:
                            location.pathname ===
                                '/' + name.toLocaleLowerCase() ||
                            location.pathname ===
                                '/dashboard/' + name.toLocaleLowerCase()
                                ? 'primary.main'
                                : 'text.primary',
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
