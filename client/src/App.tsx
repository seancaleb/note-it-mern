// MUI
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
// React Query
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// Routes
import Routes from './routes';

import { Notification } from '@/features/notification';
import { InitializeUsers } from '@/features/user';

const queryClient = new QueryClient();
const persistor = persistStore(store);

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <CssBaseline />
                        <Routes />
                        <Notification />
                        <InitializeUsers />
                        <ReactQueryDevtools
                            initialIsOpen={false}
                            position="bottom-right"
                        />
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
