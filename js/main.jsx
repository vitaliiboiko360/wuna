import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../cli/app'


import { Provider } from 'react-redux';

import { store } from '../cli/store/store.ts';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}><App /></Provider>);