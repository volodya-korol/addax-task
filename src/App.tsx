import { Provider } from 'react-redux';
import { Box } from '@mui/material';

import { Calendar } from './components/Calendar/Calendar';
import { store } from './store';

import './styles/global.scss';

function App() {
  return (
    <Provider store={store}>
      <Box mx="auto" mt="120px" maxWidth="1100px">
        <Calendar />
      </Box>
    </Provider>
  );
}

export default App;
